<script setup lang="ts">
const prismic = usePrismic();
const { data: global_navigation } = await useLazyAsyncData(
  "global_navigation",
  () => prismic.client.getSingle("global_navigation")
);
</script>

<template>
  <nav
    v-if="global_navigation?.data?.links"
    class="flex flex-wrap gap-4 px-3 pt-[0.6rem] pb-2 bg-white dark:bg-black h-fit w-fit"
  >
    <template
      v-for="(item, index) in global_navigation.data.links"
      :key="index"
    >
      <PrismicLink :field="item.link" class="leading-none" />
    </template>
  </nav>
</template>
