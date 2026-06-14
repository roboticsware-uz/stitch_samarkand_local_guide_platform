<template>
  <div class="min-h-screen bg-surface selection:bg-tertiary-container selection:text-on-tertiary-container">
    <TopNavBar />
    <Hero />
    <main id="main-content">
      <Features />
      <HowItWorks />
      <Testimonials />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import TopNavBar from '../components/TopNavBar.vue'
import Hero from '../components/Hero.vue'
import Features from '../components/Features.vue'
import HowItWorks from '../components/HowItWorks.vue'
import Testimonials from '../components/Testimonials.vue'
import Footer from '../components/Footer.vue'

useHead({
  title: 'Samarkand Local Guide | Luxury Travel & Curated Tours',
  meta: [
    {
      name: 'description',
      content: 'Discover Samarkand with high-end, matched local guides. Experience historic ancient Silk Road monuments, local cuisine, and photography spots in luxury.'
    },
    {
      name: 'keywords',
      content: 'Samarkand travel guide, Uzbekistan local guide, Registan tour, Uzbek food tour, Samarkand luxury travel'
    },
    // Open Graph / Facebook
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:title',
      content: 'Samarkand Local Guide | Luxury Travel & Curated Tours'
    },
    {
      property: 'og:description',
      content: 'Experience Samarkand through customized tours. We match you with premium local guides to discover Uzbekistan.'
    },
    {
      property: 'og:image',
      content: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpqZQ7QkBcLIDVh83lGRSaxxdzkAy4icH0M_-k8Ceae92dNAs8sm-ADwUz8_ptc730aLKWw5Wz8JFqQx6vx3yd5Zf-KogQ8QAXDFWfseSR_ON-ersiGIcAPl41UC_DoMDaaqp362ZRSN3yIwOs8Uttg9FemmU6yXMhZ3HKBplNMvXAhTJe-EzL6EZpJN6ur2l4A-FsO_nQ6T7SYtMMbJxmK1bwFjf6UlnxzO3wAZhNP_W3-v4JNKiP4VNrAsWLFwNsGayWfpV-PvKXHbo'
    },
    // Twitter
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Samarkand Local Guide | Luxury Travel & Curated Tours'
    },
    {
      name: 'twitter:description',
      content: 'Experience Samarkand through customized tours. We match you with premium local guides to discover Uzbekistan.'
    },
    {
      name: 'twitter:image',
      content: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpqZQ7QkBcLIDVh83lGRSaxxdzkAy4icH0M_-k8Ceae92dNAs8sm-ADwUz8_ptc730aLKWw5Wz8JFqQx6vx3yd5Zf-KogQ8QAXDFWfseSR_ON-ersiGIcAPl41UC_DoMDaaqp362ZRSN3yIwOs8Uttg9FemmU6yXMhZ3HKBplNMvXAhTJe-EzL6EZpJN6ur2l4A-FsO_nQ6T7SYtMMbJxmK1bwFjf6UlnxzO3wAZhNP_W3-v4JNKiP4VNrAsWLFwNsGayWfpV-PvKXHbo'
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>
