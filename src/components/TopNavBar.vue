<template>
  <nav
    class="bg-surface/90 dark:bg-inverse-surface/90 backdrop-blur-md w-full sticky top-0 z-50 border-b border-outline-variant/30"
  >
    <div
      class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-unit max-w-container-max mx-auto"
    >
      <div class="flex items-center h-full">
        <img
          alt="Samarkand Guide Logo"
          class="h-10 md:h-12 w-auto object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3z1W6lQk6Ugo3AARtkdPMNk-buBdHB1QnCNjXP_urSdJCD0uzi3x7FyYKcqzju72O0MnO5Ji5W1sQ7p55WHVXewPtrjCMCb_r3C3xiWjYsFsaJp8bTWkY4Ur1hxnCXYEFtBItEWhtHD-uMPk_YppdTYN4Wm1jLVfTzf6tZxM-tq37UcIwFixJCShPdtiEdI_NRaAmTHdfDFIVZKPtbMwmc7mJXFkDbRpnThFvDXOODYtdOW3pllmBStbxNf-XHUiBHgnF3mgn377Q"
        />
        <span
          class="ml-3 font-display-lg text-[20px] md:text-headline-sm text-on-primary-fixed"
        >
          Samarkand Guide
        </span>
      </div>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center space-x-8">
        <a
          class="text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-tertiary-container pb-1 text-body-md font-body-md opacity-80 transition-all duration-200"
          href="#"
          >Main</a
        >
        <a
          class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-body-md font-body-md hover:translate-y-[-1px] transition-transform duration-200"
          href="#features"
          >Features</a
        >
        <a
          class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-body-md font-body-md hover:translate-y-[-1px] transition-transform duration-200"
          href="#how-it-works"
          >How It Works</a
        >
        <a
          class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-body-md font-body-md hover:translate-y-[-1px] transition-transform duration-200"
          href="#testimonials"
          >Testimonials</a
        >
      </div>

      <!-- Desktop Button -->
      <div class="hidden md:flex items-center space-x-6">
        <template v-if="isAuthenticated">
          <span class="text-on-surface-variant dark:text-surface-variant text-sm font-medium max-w-[150px] truncate" :title="userEmail || ''">
            {{ userEmail }}
          </span>
          <button
            @click="logout"
            class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-body-md font-body-md"
          >
            Sign Out
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-body-md font-body-md"
          >
            Sign In
          </router-link>
        </template>

        <router-link
          to="/match"
          class="bg-on-primary-fixed text-tertiary-fixed border border-tertiary-container px-6 py-3 rounded hover:bg-primary-container transition-colors duration-300 font-label-caps text-label-caps flex items-center gap-2"
        >
          Find My Guide
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-primary flex items-center" @click="toggleMenu">
        <span class="material-symbols-outlined">{{ isMenuOpen ? 'close' : 'menu' }}</span>
      </button>
    </div>

    <!-- Mobile Links Panel -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-surface dark:bg-inverse-surface border-t border-outline-variant/30 py-4 px-margin-mobile flex flex-col space-y-4">
        <a
          class="text-primary dark:text-primary-fixed-dim font-bold text-body-md font-body-md opacity-80"
          href="#"
          @click="isMenuOpen = false"
          >Main</a
        >
        <a
          class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-body-md font-body-md"
          href="#features"
          @click="isMenuOpen = false"
          >Features</a
        >
        <a
          class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-body-md font-body-md"
          href="#how-it-works"
          @click="isMenuOpen = false"
          >How It Works</a
        >
        <a
          class="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors text-body-md font-body-md"
          href="#testimonials"
          @click="isMenuOpen = false"
          >Testimonials</a
        >
        <hr class="border-outline-variant/30" />
        <template v-if="isAuthenticated">
          <span class="text-on-surface-variant dark:text-surface-variant text-sm font-medium block truncate">
            {{ userEmail }}
          </span>
          <button
            @click="handleMobileLogout"
            class="text-left text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors text-body-md font-body-md"
          >
            Sign Out
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-left text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors text-body-md font-body-md"
            @click="isMenuOpen = false"
          >
            Sign In
          </router-link>
        </template>
        <router-link
          to="/match"
          class="w-full bg-on-primary-fixed text-tertiary-fixed border border-tertiary-container px-6 py-3 rounded hover:bg-primary-container transition-colors duration-300 font-label-caps text-label-caps flex items-center justify-center gap-2"
          @click="isMenuOpen = false"
        >
          Find My Guide
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../utils/auth'

const isMenuOpen = ref(false)
const { isAuthenticated, userEmail, logout } = useAuth()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleMobileLogout = () => {
  logout()
  isMenuOpen.value = false
}
</script>
