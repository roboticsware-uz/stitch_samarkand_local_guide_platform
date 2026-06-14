<template>
  <header
    class="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden"
  >
    <div class="absolute inset-0 z-0">
      <img
        alt="Registan Square in Samarkand at sunset, high quality professional photography"
        class="w-full h-full object-cover animate-fade-in"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpqZQ7QkBcLIDVh83lGRSaxxdzkAy4icH0M_-k8Ceae92dNAs8sm-ADwUz8_ptc730aLKWw5Wz8JFqQx6vx3yd5Zf-KogQ8QAXDFWfseSR_ON-ersiGIcAPl41UC_DoMDaaqp362ZRSN3yIwOs8Uttg9FemmU6yXMhZ3HKBplNMvXAhTJe-EzL6EZpJN6ur2l4A-FsO_nQ6T7SYtMMbJxmK1bwFjf6UlnxzO3wAZhNP_W3-v4JNKiP4VNrAsWLFwNsGayWfpV-PvKXHbo"
      />
      <div
        class="absolute inset-0 bg-on-primary-fixed/60 girih-pattern-white"
      ></div>
    </div>
    <div
      class="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center"
    >
      <h1
        class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-surface-container-lowest mb-6 drop-shadow-lg"
      >
        Your perfect Samarkand experience starts with the right guide
      </h1>
      <p
        class="font-body-lg text-body-lg text-surface-container-low mb-10 max-w-2xl text-center drop-shadow-md"
      >
        당신만의 사마르칸트를 보여줄 로컬 가이드를 만나보세요
      </p>
      <button
        class="bg-on-primary-fixed text-tertiary-fixed border border-tertiary-container px-8 py-4 rounded hover:bg-primary-container transition-colors duration-300 font-label-caps text-label-caps flex items-center gap-2 shadow-lg group"
      >
        Find My Guide
        <span
          class="material-symbols-outlined group-hover:translate-x-1 transition-transform"
          >search</span
        >
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
// Hero component logic
</script>

<style scoped>
@keyframes fadeIn {
  from {
    transform: scale(1.05);
    opacity: 0.8;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fadeIn 2.5s ease-out forwards;
}
</style>
