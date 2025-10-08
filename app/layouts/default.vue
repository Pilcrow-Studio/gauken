<script setup lang="ts">
// Global hover state for site-wide dimming effects
const isGlobalHovered = ref(false);
provide("isGlobalHovered", isGlobalHovered);
</script>

<template>
  <div>
    <div class="max-w-[1920px] mx-auto">
      <div
        class="pointer-events-none fixed left-0 top-0 right-0 z-50 md:pt-4 transition-opacity duration-300"
        :class="{ 'opacity-30': isGlobalHovered }"
      >
        <div
          class="max-w-[1920px] w-full flex justify-end mx-auto lg:grid lg:grid-cols-8 grid-cols-10 gap-4 px-4 py-4"
        >
          <Nav
            class="lg:col-start-6 md:col-start-8 md:col-span-2 col-start-9 col-span-1 pointer-events-auto"
          />
          <ActiveExhibition
            class="xl:block hidden col-start-8 col-span-1 pointer-events-auto"
          />
        </div>
      </div>
      <BottomNav
        class="transition-opacity duration-300 hidden lg:block"
        :class="{ 'opacity-30': isGlobalHovered }"
      />
      <main class="z-[9999]">
        <div class="min-h-screen flex flex-col">
          <LogoText
            class="p-4 transition-opacity duration-300"
            :class="{ 'opacity-30': isGlobalHovered }"
          />
          <div class="relative mt-24 md:mt-14 px-4 pb-24">
            <NuxtPage />
          </div>
        </div>
      </main>
    </div>
    <Footer />
  </div>
</template>
