<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div
    class="lg:fixed lg:bottom-0 lg:left-0 lg:right-0 bottom-1 left-1 right-1 z-50 transition-opacity duration-300 text-gray-400 dark:text-gray-600"
  >
    <div class="max-w-[1920px] lg:p-4 px-1 w-full mx-auto flex justify-between">
      <div>
        <p>David Wilson © {{ currentYear }}</p>
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
