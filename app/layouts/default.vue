<script setup lang="ts">
import Nav from '~/components/nav.vue'
import Footer from '~/components/footer.vue'
// import ScrollableContainer from '~/components/ScrollableContainer.vue'

const { initLenis, destroyLenis } = useLenis()

onMounted(() => {
  initLenis()
})

onBeforeUnmount(() => {
  destroyLenis()
})
</script>

<template>
  <div>
    <Nav />
    <main>
      <div class="min-h-screen">
        <NuxtPage />
      </div>
    </main>
    <Footer />
  </div>
</template>


<style scoped>
</style>