<script setup lang="ts">
import Footer from "~/components/footer.vue";
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 right-0 z-50 grid grid-cols-12 gap-4">
      <Nav class="col-start-9 col-end-10" />
      <ActiveExhibition class="col-start-12" />
    </div>
    <main>
      <div class="min-h-screen">
        <NuxtPage />
      </div>
    </main>
    <Footer />
  </div>
</template>
