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
  <footer class="footer relative pt-10 pb-5">
    <div
      class="grid grid-cols-1 lg:grid-cols-12 gap-24 max-w-[1920px] mx-auto px-5 items-center"
    >
      <p class="text-3xl lg:col-start-4 lg:col-end-10 text-center">
        (Signaturen her hadde vært fett)
      </p>
      <div
        class="row-start-2 lg:col-start-4 lg:col-end-10 text-center flex flex-wrap gap-4 justify-center"
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
