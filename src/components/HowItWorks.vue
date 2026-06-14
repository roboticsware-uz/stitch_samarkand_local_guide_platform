<template>
  <section
    class="py-24 px-margin-mobile md:px-margin-desktop bg-surface"
    id="how-it-works"
  >
    <div class="max-w-container-max mx-auto">
      <div class="text-center mb-16">
        <h2
          class="font-headline-md text-headline-md text-on-primary-fixed mb-4"
        >
          Seamless Journey
        </h2>
        <div class="w-16 h-1 bg-tertiary-container mx-auto"></div>
      </div>
      <div class="relative max-w-4xl mx-auto">
        <!-- Connecting Line -->
        <div
          class="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-on-primary-fixed/20 -translate-y-1/2 z-0"
        ></div>
        <div
          class="hidden md:block absolute top-1/2 left-[10%] w-[40%] h-[2px] bg-tertiary-container -translate-y-1/2 z-0"
        ></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <!-- Step 1 -->
          <div class="flex flex-col items-center text-center">
            <div
              class="w-16 h-16 rounded-full bg-on-primary-fixed flex items-center justify-center mb-6 shadow-lg border-2 border-tertiary-container text-tertiary-container"
            >
              <span class="material-symbols-outlined text-3xl">tune</span>
            </div>
            <h4
              class="font-headline-sm text-[18px] text-on-primary-fixed mb-2"
            >
              ① Select preferences
            </h4>
            <p
              class="font-body-md text-body-md text-on-surface-variant text-sm"
            >
              Tell us what you want to explore
            </p>
          </div>
          <!-- Step 2 -->
          <div class="flex flex-col items-center text-center">
            <div
              class="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center mb-6 shadow-sm border-2 border-on-primary-fixed/20 text-on-primary-fixed"
            >
              <span class="material-symbols-outlined text-3xl"
                >psychology</span
              >
            </div>
            <h4
              class="font-headline-sm text-[18px] text-on-primary-fixed mb-2"
            >
              ② AI matching
            </h4>
            <p
              class="font-body-md text-body-md text-on-surface-variant text-sm"
            >
              We find the perfect local guide
            </p>
          </div>
          <!-- Step 3 -->
          <div class="flex flex-col items-center text-center">
            <div
              class="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center mb-6 shadow-sm border-2 border-on-primary-fixed/20 text-on-primary-fixed"
            >
              <span class="material-symbols-outlined text-3xl"
                >handshake</span
              >
            </div>
            <h4
              class="font-headline-sm text-[18px] text-on-primary-fixed mb-2"
            >
              ③ Confirm your guide
            </h4>
            <p
              class="font-body-md text-body-md text-on-surface-variant text-sm"
            >
              Ready to start your adventure
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// How it works section logic
</script>
