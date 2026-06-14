import { ref, computed } from 'vue'

const token = ref<string | null>(
  typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
)
const userEmail = ref<string | null>(
  typeof window !== 'undefined' ? localStorage.getItem('user_email') : null
)

const isAuthenticated = computed(() => !!token.value)

export function useAuth() {
  function login(userToken: string, email: string) {
    token.value = userToken
    userEmail.value = email
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', userToken)
      localStorage.setItem('user_email', email)
    }
  }

  function logout() {
    token.value = null
    userEmail.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_email')
    }
  }

  return {
    isAuthenticated,
    userEmail,
    token,
    login,
    logout,
  }
}
