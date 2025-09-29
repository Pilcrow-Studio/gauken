<script setup lang="ts">
const route = useRoute();

// Redirect to work page with artwork parameter
await navigateTo(
  {
    path: "/work",
    query: { artwork: route.params.uid },
  },
  { redirectCode: 301 }
);
</script>

<template>
  <div>Redirecting...</div>
</template>
