<script setup lang="ts">
import Nav from "~/components/nav.vue";
import Footer from "~/components/footer.vue";
import HeaderText from "~/components/HeaderText.vue";
</script>

<template>
  <div>
    <Nav />
    <HeaderText />
    <main>
      <div class="min-h-screen">
        <NuxtPage />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
