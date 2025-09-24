<script setup lang="ts">
// Global hover state for site-wide dimming effects
const isGlobalHovered = ref(false);
provide("isGlobalHovered", isGlobalHovered);
</script>

<template>
  <div class="max-w-[1920px] mx-auto">
    <div
      class="pointer-events-none fixed left-0 top-0 right-0 z-50 pr-4 pt-4 transition-opacity duration-300"
      :class="{ 'opacity-30': isGlobalHovered }"
    >
      <div
        class="max-w-[1920px] w-full mx-auto grid lg:grid-cols-12 sm:grid-cols-2 gap-4"
      >
        <Nav class="lg:col-start-9 lg:col-span-2 pointer-events-auto" />
        <ActiveExhibition
          class="lg:block md:hidden sm:hidden col-start-12 col-end-13 pointer-events-auto"
        />
      </div>
    </div>
    <BottomNav
      class="transition-opacity duration-300"
      :class="{ 'opacity-30': isGlobalHovered }"
    />
    <main class="z-[9999]">
      <div class="min-h-screen flex flex-col">
        <LogoText
          class="p-4 transition-opacity duration-300"
          :class="{ 'opacity-30': isGlobalHovered }"
        />
        <NuxtPage class="" />
      </div>
    </main>
    <Footer />
  </div>
</template>
