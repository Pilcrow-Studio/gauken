<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.FooterSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <footer class="footer relative h-screen py-96 border-t border-b border-black">
    <div class="grid grid-cols-12">
      <p class="text-[100px] col-start-4 col-end-10 text-center">Footer</p>
    </div>
  </footer>
</template>
