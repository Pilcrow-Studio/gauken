<script setup lang="ts">
import { useOverlayScrollbars } from "overlayscrollbars-vue";
import 'overlayscrollbars/overlayscrollbars.css';

const scrollContainer = ref<HTMLElement>()
const [initialize, _instance] = useOverlayScrollbars()

onMounted(() => {
  if (scrollContainer.value) {
    initialize({ target: scrollContainer.value })
  }
})
</script>

<template>
  <div ref="scrollContainer" class="h-screen overflow-hidden">
    <slot />
  </div>
</template>
