<script setup lang="ts">
console.log("App");

// Ensure Lenis is available globally
const { $lenis } = useNuxtApp();
console.log("Lenis instance:", $lenis);
</script>

<template>
  <div>
    <NuxtLayout />
  </div>
</template>
