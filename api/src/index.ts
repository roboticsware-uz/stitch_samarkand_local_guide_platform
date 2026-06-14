import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sign } from 'hono/jwt'

type Bindings = {
  DB: D1Database
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

export default app
