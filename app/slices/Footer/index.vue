<script setup lang="ts">
import type { Content } from "@prismicio/client";

const { data: global_navigation } = await useGlobalNavigation();

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
  <footer class="footer relative pt-10 pb-5 bg-blue-600">
    <div
      class="grid grid-cols-12 gap-24 max-w-[1920px] mx-auto px-5 items-center"
    >
      <p class="text-3xl col-start-4 col-end-10 text-center">Footer Logo(?)</p>
      <div
        class="row-start-2 col-start-4 col-end-10 text-center flex flex-wrap gap-4 justify-center"
      >
        <template
          v-for="(item, index) in global_navigation?.data.links"
          :key="index"
        >
          <PrismicLink :field="item.link" class="leading-none" />
        </template>
      </div>
    </div>
  </footer>
</template>
