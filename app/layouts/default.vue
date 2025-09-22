<script setup lang="ts"></script>

<template>
  <div>
    <div>
      <LogoText />
      <BottomNav />
      <div
        class="fixed top-0 left-0 right-0 z-50 grid grid-cols-12 gap-4 pr-4 pt-4"
      >
        <Nav class="col-start-8 col-end-10" />
        <ActiveExhibition class="col-start-12" />
      </div>
    </div>
    <main>
      <div class="min-h-screen">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
