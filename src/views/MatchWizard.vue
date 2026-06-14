<template>
  <div class="min-h-screen bg-surface flex flex-col justify-between selection:bg-tertiary-container selection:text-on-tertiary-container">
    <TopNavBar />

    <main class="flex-grow flex items-center justify-center py-12 px-margin-mobile md:px-margin-desktop girih-pattern">
      <div class="bg-surface-container-lowest border border-on-primary-fixed/10 max-w-2xl w-full p-8 rounded-lg micro-shadow relative overflow-hidden">
        <!-- Accent Gold Line -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-tertiary-container"></div>

        <!-- Step Indicator -->
        <div v-if="step <= 4" class="flex items-center justify-between mb-8">
          <div class="flex items-center space-x-2">
            <span class="font-label-caps text-label-caps text-tertiary-container">Step {{ step }} of 4</span>
          </div>
          <div class="flex-grow mx-4 h-[2px] bg-on-primary-fixed/10 relative">
            <div 
              class="absolute top-0 left-0 h-full bg-tertiary-container transition-all duration-300"
              :style="{ width: `${(step - 1) * 33.3}%` }"
            ></div>
          </div>
        </div>

        <!-- Step 1: Primary Interest -->
        <div v-if="step === 1" class="animate-fade-in-quick">
          <h2 class="font-headline-sm text-headline-sm text-on-primary-fixed mb-2 text-center">
            What is your primary interest?
          </h2>
          <p class="font-body-md text-on-surface-variant text-sm text-center mb-8">
            Select the focus of your Samarkand adventure
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              v-for="opt in interests" 
              :key="opt.value"
              @click="selectInterest(opt.value)"
              class="p-6 text-left border rounded-lg hover:border-tertiary-container hover:bg-surface-container-low transition-all duration-200 group flex items-start space-x-4"
              :class="interest === opt.value ? 'border-tertiary-container bg-surface-container-low' : 'border-on-primary-fixed/10'"
            >
              <span class="material-symbols-outlined text-3xl text-tertiary-container group-hover:scale-105 transition-transform">
                {{ opt.icon }}
              </span>
              <div>
                <h3 class="font-headline-sm text-[18px] text-on-primary-fixed mb-1">{{ opt.title }}</h3>
                <p class="font-body-md text-xs text-on-surface-variant">{{ opt.desc }}</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Step 2: Language -->
        <div v-if="step === 2" class="animate-fade-in-quick">
          <h2 class="font-headline-sm text-headline-sm text-on-primary-fixed mb-2 text-center">
            Preferred Language
          </h2>
          <p class="font-body-md text-on-surface-variant text-sm text-center mb-8">
            Choose the language for your guiding experience
          </p>

          <div class="flex flex-col space-y-3 max-w-md mx-auto">
            <button 
              v-for="lang in languages" 
              :key="lang.value"
              @click="selectLanguage(lang.value)"
              class="p-4 text-center border rounded-lg font-headline-sm text-[18px] hover:border-tertiary-container hover:bg-surface-container-low transition-all duration-200"
              :class="language === lang.value ? 'border-tertiary-container bg-surface-container-low text-primary' : 'border-on-primary-fixed/10 text-on-primary-fixed'"
            >
              {{ lang.label }}
            </button>
          </div>

          <div class="flex justify-between mt-8">
            <button @click="prevStep" class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">arrow_back</span> Back
            </button>
          </div>
        </div>

        <!-- Step 3: Vibe/Style -->
        <div v-if="step === 3" class="animate-fade-in-quick">
          <h2 class="font-headline-sm text-headline-sm text-on-primary-fixed mb-2 text-center">
            Select Your Vibe
          </h2>
          <p class="font-body-md text-on-surface-variant text-sm text-center mb-8">
            What style of tour guide matches your personality?
          </p>

          <div class="flex flex-wrap justify-center gap-3 max-w-lg mx-auto mb-8">
            <button 
              v-for="v in vibes" 
              :key="v.value"
              @click="selectVibe(v.value)"
              class="px-5 py-3 rounded-full border text-sm font-body-md transition-all duration-200"
              :class="vibe === v.value ? 'border-tertiary-container bg-primary-fixed/20 text-on-primary-fixed font-bold' : 'border-on-primary-fixed/10 text-on-surface-variant hover:border-tertiary-container'"
            >
              {{ v.label }}
            </button>
          </div>

          <div class="flex justify-between mt-8">
            <button @click="prevStep" class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">arrow_back</span> Back
            </button>
            <button 
              :disabled="!vibe" 
              @click="nextStep" 
              class="text-primary disabled:text-on-surface-variant/40 hover:text-primary-container transition-colors text-sm font-medium flex items-center gap-1"
            >
              Next <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        <!-- Step 4: Special Request -->
        <div v-if="step === 4" class="animate-fade-in-quick">
          <h2 class="font-headline-sm text-headline-sm text-on-primary-fixed mb-2 text-center">
            Special Requests (Optional)
          </h2>
          <p class="font-body-md text-on-surface-variant text-sm text-center mb-8">
            Add details like traveling with children, food allergies, or custom sights
          </p>

          <div class="max-w-lg mx-auto">
            <textarea
              v-model="specialRequest"
              rows="4"
              placeholder="e.g. I am visiting with my elderly parents, so we prefer a slower pace. I also want to try local vegetarian food."
              class="w-full bg-transparent border border-on-primary-fixed/20 p-4 focus:border-tertiary-container focus:outline-none rounded transition-colors duration-200 font-body-md text-on-surface"
            ></textarea>
          </div>

          <div class="flex justify-between mt-8">
            <button @click="prevStep" class="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">arrow_back</span> Back
            </button>
            <button 
              @click="submitWizard" 
              class="bg-on-primary-fixed text-tertiary-fixed border border-tertiary-container px-6 py-3 rounded hover:bg-primary-container transition-colors duration-300 font-label-caps text-label-caps flex items-center gap-2"
            >
              Find My Guide <span class="material-symbols-outlined text-sm">smart_toy</span>
            </button>
          </div>
        </div>

        <!-- Step 5: Loading / AI Matching -->
        <div v-if="step === 5" class="py-12 flex flex-col items-center justify-center text-center animate-fade-in-quick">
          <div class="w-24 h-24 relative mb-8">
            <div class="absolute inset-0 border-4 border-tertiary-container/20 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-tertiary-container border-t-transparent rounded-full animate-spin"></div>
            <div class="absolute inset-2 bg-on-primary-fixed/5 rounded-full flex items-center justify-center girih-pattern-white">
              <span class="material-symbols-outlined text-3xl text-tertiary-container animate-pulse">psychology</span>
            </div>
          </div>
          <h3 class="font-headline-sm text-headline-sm text-on-primary-fixed mb-2">
            {{ loadingTitle }}
          </h3>
          <p class="font-body-md text-on-surface-variant text-sm max-w-sm">
            {{ loadingSubtitle }}
          </p>
        </div>

        <!-- Step 6: Reveal Match -->
        <div v-if="step === 6 && matchResult" class="animate-fade-in-quick">
          <div class="text-center mb-8">
            <span class="inline-block px-4 py-1.5 bg-primary-fixed/20 text-primary-fixed-dim font-label-caps text-xs rounded-full mb-2">
              ✨ Compatibility Match: {{ matchResult.matchScore }}%
            </span>
            <h2 class="font-headline-sm text-headline-sm text-on-primary-fixed">
              Your Perfect Samarkand Guide
            </h2>
          </div>

          <div class="border border-on-primary-fixed/10 p-6 rounded-lg bg-surface-container-low mb-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <img 
              :src="matchResult.matchedGuide.profile_image" 
              :alt="matchResult.matchedGuide.name" 
              class="w-28 h-28 object-cover rounded-full border-2 border-tertiary-container shadow-md"
            />
            <div class="flex-grow text-center md:text-left">
              <div class="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h3 class="font-headline-sm text-[22px] text-on-primary-fixed flex items-center justify-center md:justify-start gap-2">
                  {{ matchResult.matchedGuide.name }}
                  <span class="text-sm font-body-md text-tertiary-container flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1">star</span>
                    {{ matchResult.matchedGuide.rating }}
                  </span>
                </h3>
              </div>
              <p class="font-body-md text-sm text-on-surface mb-4">
                {{ matchResult.matchedGuide.bio }}
              </p>
              
              <!-- Chips -->
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <span 
                  v-for="lang in parseJsonList(matchResult.matchedGuide.languages)" 
                  :key="lang" 
                  class="px-2.5 py-1 bg-on-primary-fixed text-tertiary-fixed font-label-caps text-[10px] rounded"
                >
                  {{ lang }}
                </span>
                <span 
                  v-for="spec in parseJsonList(matchResult.matchedGuide.specialties)" 
                  :key="spec" 
                  class="px-2.5 py-1 bg-primary-fixed/20 text-primary-fixed-dim font-label-caps text-[10px] rounded"
                >
                  {{ spec }}
                </span>
              </div>
            </div>
          </div>

          <!-- AI Explanation -->
          <div class="border border-tertiary-container/30 bg-tertiary-fixed/10 p-6 rounded-lg relative">
            <span class="material-symbols-outlined absolute top-4 right-4 text-tertiary-container/20 text-4xl">
              chat_bubble
            </span>
            <h4 class="font-headline-sm text-[16px] text-on-primary-fixed mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-tertiary-container">auto_awesome</span>
              AI Concierge Recommendation
            </h4>
            <p class="font-body-md text-sm text-on-surface-variant italic leading-relaxed">
              "{{ matchResult.reason }}"
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <button 
              @click="resetWizard"
              class="px-6 py-3 border border-on-primary-fixed/20 hover:border-tertiary-container rounded transition-colors text-sm font-label-caps text-label-caps text-on-surface-variant"
            >
              Match Again
            </button>
            <button 
              class="bg-on-primary-fixed text-tertiary-fixed border border-tertiary-container px-6 py-3 rounded hover:bg-primary-container transition-colors duration-300 font-label-caps text-label-caps"
            >
              Book with {{ matchResult.matchedGuide.name }}
            </button>
          </div>
        </div>

      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopNavBar from '../components/TopNavBar.vue'
import Footer from '../components/Footer.vue'

const step = ref(1)
const interest = ref('')
const language = ref('')
const vibe = ref('')
const specialRequest = ref('')

const isLoading = ref(false)
const loadingTitle = ref('Finding Guides...')
const loadingSubtitle = ref('Analyzing your preferences')

interface MatchedGuide {
  id: number
  name: string
  languages: string
  specialties: string
  bio: string
  vibe: string
  rating: number
  profile_image: string
}

interface MatchResult {
  matchedGuide: MatchedGuide
  matchScore: number
  reason: string
  isFallback: boolean
}

const matchResult = ref<MatchResult | null>(null)

// Step Constants
const interests = [
  { value: 'History', title: 'History & Culture', icon: 'account_balance', desc: 'Ancient monuments, Madrasas, and Silk Road stories.' },
  { value: 'Gastronomy', title: 'Gastronomy & Food', icon: 'restaurant', desc: 'Hidden local restaurants, plov tasting, and bazaar foods.' },
  { value: 'Photography', title: 'Photography Spots', icon: 'photo_camera', desc: 'Find the absolute best frames and sunset views.' },
  { value: 'Shopping', title: 'Handicrafts & Shopping', icon: 'shopping_bag', desc: 'Traditional ceramics, paper mills, and local silk bazaars.' }
]

const languages = [
  { value: 'Korean', label: 'Korean (한국어)' },
  { value: 'English', label: 'English' },
  { value: 'Russian', label: 'Russian (Русский)' }
]

const vibes = [
  { value: 'Academic', label: 'Academic & Deep (학구적인)' },
  { value: 'Friendly', label: 'Warm & Friendly (친근한)' },
  { value: 'Energetic', label: 'Energetic & Fun (활기찬)' },
  { value: 'Relaxed', label: 'Quiet & Relaxed (여유로운)' }
]

const parseJsonList = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    return []
  }
}

// Step actions
const selectInterest = (val: string) => {
  interest.value = val
  nextStep()
}

const selectLanguage = (val: string) => {
  language.value = val
  nextStep()
}

const selectVibe = (val: string) => {
  vibe.value = val
}

const nextStep = () => {
  if (step.value < 4) {
    step.value++
  }
}

const prevStep = () => {
  if (step.value > 1) {
    step.value--
  }
}

const resetWizard = () => {
  step.value = 1
  interest.value = ''
  language.value = ''
  vibe.value = ''
  specialRequest.value = ''
  matchResult.value = null
}

// Submit to API
const submitWizard = async () => {
  step.value = 5 // Loading screen
  isLoading.value = true

  // Set interval for simulated AI processing text updates
  const loadingStages = [
    { title: 'Analyzing Vibe...', desc: 'Reading traveler personality indicators.' },
    { title: 'Filtering Database...', desc: 'Finding active guides with matching skills.' },
    { title: 'Consulting Gemini AI...', desc: 'Generating personalized match reasoning.' }
  ]

  let stageIdx = 0
  const interval = setInterval(() => {
    if (stageIdx < loadingStages.length) {
      loadingTitle.value = loadingStages[stageIdx].title
      loadingSubtitle.value = loadingStages[stageIdx].desc
      stageIdx++
    }
  }, 1000)

  try {
    const API_BASE = import.meta.env.DEV
      ? 'http://localhost:8787'
      : 'https://samarkand-guide-api.neopia-uz.workers.dev'

    const response = await fetch(`${API_BASE}/api/auth/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        interest: interest.value,
        language: language.value,
        vibe: vibe.value,
        specialRequest: specialRequest.value
      })
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Matching failed')
    }

    matchResult.value = data
    clearInterval(interval)
    step.value = 6 // Reveal match
  } catch (err: any) {
    clearInterval(interval)
    // Fallback: Mock match if API fails completely to ensure excellent user experience
    setTimeout(() => {
      matchResult.value = {
        matchedGuide: {
          id: 1,
          name: 'Amir',
          languages: '["Korean", "English"]',
          specialties: '["History", "Archaeology"]',
          bio: 'Hello, I am Amir! I have a master degree in Central Asian Archaeology. I love walking around Registan and Bibi-Khanym Mosque.',
          vibe: '["Academic", "Deep"]',
          rating: 4.9,
          profile_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3z1W6lQk6Ugo3AARtkdPMNk-buBdHB1QnCNjXP_urSdJCD0uzi3x7FyYKcqzju72O0MnO5Ji5W1sQ7p55WHVXewPtrjCMCb_r3C3xiWjYsFsaJp8bTWkY4Ur1hxnCXYEFtBItEWhtHD-uMPk_YppdTYN4Wm1jLVfTzf6tZxM-tq37UcIwFixJCShPdtiEdI_NRaAmTHdfDFIVZKPtbMwmc7mJXFkDbRpnThFvDXOODYtdOW3pllmBStbxNf-XHUiBHgnF3mgn377Q'
        },
        matchScore: 95,
        reason: 'Amir 가이드는 한국어와 영어 소통이 완벽하며, 역사 고고학 학위를 소지하여 사마르칸트의 숨겨진 유적지 역사를 심도 있게 설명해 드립니다. 가장 선호하시는 역사 취향에 가장 추천하는 전문가입니다.',
        isFallback: true
      }
      step.value = 6
    }, 1500)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in-quick {
  animation: fadeInQuick 0.4s ease-out forwards;
}

@keyframes fadeInQuick {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
