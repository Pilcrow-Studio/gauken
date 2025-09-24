<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();

const { data: about } = await useAsyncData("about", () =>
  prismic.client.getSingle("about")
);
</script>

<template>
  <div class="grid grid-cols-12 mt-24 text-center">
    <div class="col-start-4 col-span-6">
      <SliceZone :slices="about?.data.slices ?? []" :components="components" />
    </div>
  </div>
</template>
