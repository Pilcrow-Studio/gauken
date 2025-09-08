<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/bio">Bio</NuxtLink>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
nav {
  @apply top-0 left-0 w-full h-16 bg-white z-50 gap-4 flex justify-center items-center fixed;
}
</style>