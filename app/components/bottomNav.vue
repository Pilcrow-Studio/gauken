<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div
    class="fixed bottom-5 left-5 right-5 z-50 transition-opacity duration-300 text-gray-400 dark:text-gray-600"
  >
    <div class="max-w-[1920px] px-4 w-full mx-auto flex justify-between">
      <div>
        <p>Gauken aka David Wilson {{ currentYear }}</p>
      </div>
      <div class="flex flex-row gap-2">
        <NuxtLink to="https://www.instagram.com/gaukenart/" target="_blank">
          <p>Instagram</p>
        </NuxtLink>
        <NuxtLink to="https://www.instagram.com/gaukenart/" target="_blank">
          <p>Email</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
