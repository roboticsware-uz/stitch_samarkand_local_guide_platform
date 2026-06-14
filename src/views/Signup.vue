<template>
  <div class="min-h-screen bg-surface flex flex-col justify-between selection:bg-tertiary-container selection:text-on-tertiary-container">
    <TopNavBar />
    
    <main class="flex-grow flex items-center justify-center py-12 px-margin-mobile md:px-margin-desktop girih-pattern">
      <div class="bg-surface-container-lowest border border-on-primary-fixed/10 max-w-md w-full p-8 rounded-lg micro-shadow relative">
        <!-- Accent Gold Line -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-tertiary-container"></div>
        
        <div class="text-center mb-8">
          <h2 class="font-headline-sm text-headline-sm text-on-primary-fixed mb-2">
            Create Account
          </h2>
          <p class="font-body-md text-on-surface-variant text-sm">
            Sign up to unlock custom itineraries and guides
          </p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-6">
          <!-- Error Alert -->
          <div v-if="errorMsg" class="p-4 bg-error-container text-on-error-container rounded border border-error/20 text-sm">
            {{ errorMsg }}
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block font-label-caps text-label-caps text-on-surface-variant mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="name@example.com"
              class="w-full bg-transparent border-b border-on-primary-fixed/20 py-2 focus:border-tertiary-container focus:outline-none transition-colors duration-200 font-body-md text-on-surface"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block font-label-caps text-label-caps text-on-surface-variant mb-2">
              Password (Min 6 chars)
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full bg-transparent border-b border-on-primary-fixed/20 py-2 focus:border-tertiary-container focus:outline-none transition-colors duration-200 font-body-md text-on-surface"
            />
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label for="confirmPassword" class="block font-label-caps text-label-caps text-on-surface-variant mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              placeholder="••••••••"
              class="w-full bg-transparent border-b border-on-primary-fixed/20 py-2 focus:border-tertiary-container focus:outline-none transition-colors duration-200 font-body-md text-on-surface"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-on-primary-fixed text-tertiary-fixed border border-tertiary-container py-3 rounded hover:bg-primary-container disabled:bg-on-primary-fixed/50 disabled:cursor-not-allowed transition-colors duration-300 font-label-caps text-label-caps flex items-center justify-center gap-2"
          >
            <span v-if="isLoading">Registering...</span>
            <span v-else class="flex items-center gap-2">
              Create Account <span class="material-symbols-outlined text-sm">person_add</span>
            </span>
          </button>
        </form>

        <!-- Redirect to Login -->
        <div class="mt-6 text-center text-sm font-body-md text-on-surface-variant">
          Already have an account? 
          <router-link to="/login" class="text-primary hover:text-primary-container font-semibold transition-colors">
            Login Here
          </router-link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../utils/auth'
import TopNavBar from '../components/TopNavBar.vue'
import Footer from '../components/Footer.vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

const router = useRouter()
const { login } = useAuth()

const API_BASE = import.meta.env.DEV
  ? 'http://localhost:8787'
  : 'https://samarkand-guide-api.neopia-uz.workers.dev'

const handleSignup = async () => {
  errorMsg.value = ''
  
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match'
    return
  }
  
  if (password.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters long'
    return
  }

  isLoading.value = true
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed')
    }
    
    // Save state globally
    login(data.token, data.user.email)
    
    // Redirect back
    router.push('/')
  } catch (err: any) {
    errorMsg.value = err.message || 'An error occurred during registration.'
  } finally {
    isLoading.value = false
  }
}
</script>
