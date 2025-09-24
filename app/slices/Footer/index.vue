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
  <footer class="footer relative h-screen py-96">
    <p class="text-[100px]">Footer</p>
  </footer>
</template>
