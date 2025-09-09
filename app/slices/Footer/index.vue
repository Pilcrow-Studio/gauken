<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.FooterSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer relative h-screen">
	<div class="absolute inset-0 z-0 w-full h-full">
		<PrismicImage class="w-full h-full object-cover" :field="slice.primary.background_image" />
	</div>
    <div class="relative h-full w-full flex flex-col justify-between px-12 pt-24">
      <div class="grid grid-cols-10 z-50 mx-auto w-full text-xs text-white">
        <div class="relative flex flex-col gap-4">
          <template v-for="(item, index) in slice.primary.external_links" :key="index">
            <PrismicLink :field="item.external_link" />
          </template>
        </div>
        <div class="relative flex flex-col gap-4 col-start-5">
          <p>© Gauken {{ currentYear }}</p>
          <NuxtLink to="/">Home</NuxtLink>
        </div>
        <div class="relative flex flex-col gap-4 col-start-7 col-end-10">
          <p class="text-5xl">Exhibition Yin Yang at Gauken</p>
        </div>
      </div>
      <div class="relative z-50 mx-auto w-full text-xs text-white">
        <p class="text-[200px] font-medium mb-32 tracking-tight">Gauken</p>
        <div class="w-[500px] h-[200px] bg-white" />
      </div>
    </div>
  </footer>
</template>
