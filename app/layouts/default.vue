<script setup lang="ts">
// Global hover state for site-wide dimming effects
const isGlobalHovered = ref(false);
provide("isGlobalHovered", isGlobalHovered);
</script>

<template>
  <div>
    <div
      class="grid lg:grid-cols-12 sm:grid-cols-2 gap-4 pointer-events-none fixed top-0 right-0 max-w-fit z-50 pr-4 pt-4 transition-opacity duration-300"
      :class="{ 'opacity-30': isGlobalHovered }"
    >
      <Nav class="lg:col-start-10 pointer-events-auto" />
      <ActiveExhibition
        class="lg:block md:hidden sm:hidden col-start-12 col-end-13 pointer-events-auto"
      />
    </div>
    <BottomNav
      class="transition-opacity duration-300"
      :class="{ 'opacity-30': isGlobalHovered }"
    />
    <main class="z-[9999]">
      <div class="min-h-screen flex flex-col">
        <LogoText
          class="transition-opacity duration-300"
          :class="{ 'opacity-30': isGlobalHovered }"
        />
        <NuxtPage class="grow" />
      </div>
    </main>
  </div>
</template>
