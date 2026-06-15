<template>
  <div class="min-h-screen bg-surface flex flex-col justify-between selection:bg-tertiary-container selection:text-on-tertiary-container">
    <TopNavBar />
    
    <main class="flex-grow flex items-center justify-center py-12 px-margin-mobile md:px-margin-desktop girih-pattern">
      <div class="bg-surface-container-lowest border border-on-primary-fixed/10 max-w-md w-full p-8 rounded-lg micro-shadow relative">
        <!-- Accent Gold Line -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-tertiary-container"></div>
        
        <div class="text-center mb-8">
          <h2 class="font-headline-sm text-headline-sm text-on-primary-fixed mb-2">
            Welcome Back
          </h2>
          <p class="font-body-md text-on-surface-variant text-sm">
            Sign in to access your premium concierge services
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
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
              Password
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

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-on-primary-fixed text-tertiary-fixed border border-tertiary-container py-3 rounded hover:bg-primary-container disabled:bg-on-primary-fixed/50 disabled:cursor-not-allowed transition-colors duration-300 font-label-caps text-label-caps flex items-center justify-center gap-2"
          >
            <span v-if="isLoading">Signing In...</span>
            <span v-else class="flex items-center gap-2">
              Sign In <span class="material-symbols-outlined text-sm">login</span>
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6 flex items-center justify-center">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-on-primary-fixed/10"></div>
          </div>
          <span class="relative bg-surface-container-lowest px-4 text-xs font-body-md text-on-surface-variant uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        <!-- Google Sign-In Button Container -->
        <div class="flex justify-center mb-6">
          <div id="google-signin-btn" class="w-full"></div>
        </div>

        <!-- Redirect to Signup -->
        <div class="mt-6 text-center text-sm font-body-md text-on-surface-variant">
          Don't have an account? 
          <router-link to="/signup" class="text-primary hover:text-primary-container font-semibold transition-colors">
            Register Here
          </router-link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../utils/auth'
import TopNavBar from '../components/TopNavBar.vue'
import Footer from '../components/Footer.vue'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

const router = useRouter()
const { login } = useAuth()

const API_BASE = import.meta.env.DEV
  ? 'http://localhost:8787'
  : 'https://samarkand-guide-api.neopia-uz.workers.dev'

const handleLogin = async () => {
  errorMsg.value = ''
  isLoading.value = true
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
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
      throw new Error(data.error || 'Login failed')
    }
    
    // Save state globally
    login(data.token, data.user.email)
    
    // Redirect back
    router.push('/')
  } catch (err: any) {
    errorMsg.value = err.message || 'An error occurred during sign in.'
  } finally {
    isLoading.value = false
  }
}

const handleCredentialResponse = async (response: any) => {
  errorMsg.value = ''
  isLoading.value = true
  
  try {
    const idToken = response.credential
    const res = await fetch(`${API_BASE}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idToken })
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || 'Google Login failed')
    }

    login(data.token, data.user.email)
    router.push('/')
  } catch (err: any) {
    errorMsg.value = err.message || 'An error occurred during Google Sign-in.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const initGoogle = () => {
    if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
      (window as any).google.accounts.id.initialize({
        client_id: '506066541375-tlqhivi30abpkrt75n00c0r1n607o35b.apps.googleusercontent.com',
        callback: handleCredentialResponse
      });
      (window as any).google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        { 
          theme: 'outline', 
          size: 'large', 
          width: '100%',
          text: 'signin_with',
          shape: 'rectangular'
        }
      );
    } else {
      setTimeout(initGoogle, 100)
    }
  }
  initGoogle()
})
</script>
