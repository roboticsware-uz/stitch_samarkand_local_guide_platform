import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sign } from 'hono/jwt'

type Bindings = {
  DB: D1Database
  GEMINI_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
}))

// Helper to hash password
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = 'samarkand-guide-salt-key-123456!'
  const passwordData = encoder.encode(password + salt)
  const hashBuffer = await crypto.subtle.digest('SHA-256', passwordData)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

const JWT_SECRET = 'samarkand-secret-jwt-key-789!'

// Register endpoint
app.post('/api/auth/signup', async (c) => {
  try {
    const { email, password } = await c.req.json()
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400)
    }

    if (password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters long' }, 400)
    }

    // Check if user already exists
    const existingUser = await c.env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first()

    if (existingUser) {
      return c.json({ error: 'Email already registered' }, 400)
    }

    const passwordHash = await hashPassword(password)

    // Insert user
    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)'
    ).bind(email.toLowerCase(), passwordHash).run()

    if (!result.success) {
      return c.json({ error: 'Failed to create user' }, 500)
    }

    // Generate JWT
    const payload = {
      email: email.toLowerCase(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    }
    const token = await sign(payload, JWT_SECRET)

    return c.json({
      message: 'User registered successfully',
      token,
      user: { email: email.toLowerCase() }
    })
  } catch (err: any) {
    return c.json({ error: err.message || 'Server error' }, 500)
  }
})

// Login endpoint
app.post('/api/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400)
    }

    // Retrieve user
    const user = await c.env.DB.prepare(
      'SELECT email, password_hash FROM users WHERE email = ?'
    ).bind(email.toLowerCase()).first<{ email: string; password_hash: string }>()

    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 400)
    }

    const inputHash = await hashPassword(password)
    if (inputHash !== user.password_hash) {
      return c.json({ error: 'Invalid email or password' }, 400)
    }

    // Generate JWT
    const payload = {
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    }
    const token = await sign(payload, JWT_SECRET)

    return c.json({
      message: 'Login successful',
      token,
      user: { email: user.email }
    })
  } catch (err: any) {
    return c.json({ error: err.message || 'Server error' }, 500)
  }
})

// Match endpoint
app.post('/api/auth/match', async (c) => {
  try {
    const { interest, language, vibe, specialRequest } = await c.req.json()
    
    // 1. Fetch guides from D1
    const { results: guides } = await c.env.DB.prepare(
      'SELECT id, name, languages, specialties, bio, vibe, rating, profile_image FROM guides'
    ).all<any>()
    
    if (!guides || guides.length === 0) {
      return c.json({ error: 'No guides available in database' }, 404)
    }

    // 2. Format guides pool for Gemini
    const guidesFormatted = guides.map(g => {
      return `Guide ID: ${g.id}
Name: ${g.name}
Languages: ${g.languages}
Specialties: ${g.specialties}
Vibe: ${g.vibe}
Rating: ${g.rating}
Bio: ${g.bio}`
    }).join('\n\n')

    // 3. Define the prompt for Gemini
    const languageMap: Record<string, string> = {
      Korean: 'Korean (한국어)',
      English: 'English',
      Russian: 'Russian (Русский)'
    }
    const targetLanguage = languageMap[language] || 'English'

    const systemPrompt = `You are a professional luxury travel concierge matching tourists with the perfect guide in Samarkand, Uzbekistan.
    
We have a pool of local guides. Below are their details:

${guidesFormatted}

Here are the traveler's preferences:
- Primary Interest: ${interest}
- Preferred Language: ${language}
- Vibe/Style: ${vibe}
- Special Request/Notes: ${specialRequest || 'None'}

Your task is to select the BEST matching guide from the pool above.
You must respond ONLY with a JSON object. Do not include markdown formatting backticks (like \`\`\`json ... \`\`\`) or any text outside of the JSON object.
The JSON object must follow this format:
{
  "matchedGuideId": <number matching the chosen guide's ID>,
  "matchScore": <number between 50 and 100 indicating match percentage>,
  "reason": "<A 2-3 sentence personalized explanation in ${targetLanguage} explaining WHY they are matched. You MUST explicitly state that they are matched because they speak the user's selected language (${targetLanguage}) and explain how this language capability will make their tour of Samarkand more comfortable and immersive. Address the user directly in a warm, polite, and professional tone. Do not mention system-level variables.>"
}`

    // 4. Check if Gemini API key exists
    const apiKey = c.env.GEMINI_API_KEY
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      // Deterministic Fallback Mode
      let bestGuide = guides[0]
      let maxScore = 50
      
      for (const g of guides) {
        let score = 70
        // Lang check
        const langs = JSON.parse(g.languages || '[]')
        if (langs.includes(language)) score += 15
        
        // Specialty check
        const specs = JSON.parse(g.specialties || '[]')
        if (specs.includes(interest)) score += 10
        
        // Vibe check
        const vibes = JSON.parse(g.vibe || '[]')
        if (vibes.includes(vibe)) score += 5
        
        if (score > maxScore) {
          maxScore = score
          bestGuide = g
        }
      }
      
      let fallbackReason = ''
      if (language === 'Korean') {
        fallbackReason = `${bestGuide.name} 가이드는 고객님께서 선택하신 언어인 한국어로 원활하게 소통할 수 있어 여행 내내 깊이 있고 편안한 대화가 가능합니다. 또한 고객님의 관심사인 '${interest}' 투어와 '${vibe}' 스타일의 맞춤형 경험을 제공하기에 가장 이상적인 가이드로 추천해 드립니다.`
      } else if (language === 'Russian') {
        fallbackReason = `Гид ${bestGuide.name} свободно владеет выбранным вами русским языком, что сделает ваше путешествие по Самарканду максимально комфортным и увлекательным. Он отлично подходит для темы "${interest}" и соответствует вашим предпочтениям к стилю поездки.`
      } else {
        fallbackReason = `Guide ${bestGuide.name} communicates fluently in your selected language, English, ensuring a seamless and clear experience during your tour. They are also a perfect match for your interest in "${interest}" and align well with your requested vibe.`
      }
      
      return c.json({
        matchedGuide: bestGuide,
        matchScore: maxScore,
        reason: fallbackReason,
        isFallback: true
      })
    }

    // 5. Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Gemini API returned error: ${errText}`)
    }

    const resData = await response.json<any>()
    const contentText = resData.candidates?.[0]?.content?.parts?.[0]?.text
    if (!contentText) {
      throw new Error('Invalid response from Gemini API')
    }

    const cleanJsonText = contentText.replace(/```json/g, '').replace(/```/g, '').trim()
    const matchResult = JSON.parse(cleanJsonText)

    // Find the guide profile
    const matchedGuide = guides.find(g => g.id === matchResult.matchedGuideId) || guides[0]

    return c.json({
      matchedGuide,
      matchScore: matchResult.matchScore,
      reason: matchResult.reason,
      isFallback: false
    })

  } catch (err: any) {
    return c.json({ error: err.message || 'Matching failed' }, 500)
  }
})

export default app

