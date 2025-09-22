<script setup lang="ts">
// Calculate header height based on the LogoText font size
// Using CSS calc: 14vw - 1.5rem (from logoText component)
const headerHeight = computed(() => {
  if (import.meta.client) {
    const vw = window.innerWidth / 100;
    const logoHeight = 14 * vw - 24; // 1.5rem = 24px typically
    return Math.max(logoHeight + 40, 242); // Add some padding, minimum 80px
  }
  return 242; // Default fallback for SSR
});

// Provide the header height to child components
provide("headerHeight", headerHeight);
</script>

<template>
  <div class="dark:bg-black dark:text-white">
    <div id="header">
      <LogoText />
    </div>
    <BottomNav />
    <div
      class="fixed top-0 left-0 right-0 z-50 grid grid-cols-12 gap-4 pr-4 pt-4"
    >
      <Nav class="col-start-8 col-end-10" />
      <ActiveExhibition class="col-start-12" />
    </div>
    <main>
      <div class="min-h-screen">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
