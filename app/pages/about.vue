<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();

const { data: about } = await useAsyncData("about", () =>
  prismic.client.getSingle("about")
);
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 md:text-center text-left">
    <div class="col-start-1 lg:col-start-4 lg:col-span-6">
      <SliceZone :slices="about?.data.slices ?? []" :components="components" />
    </div>
  </div>
</template>
