<script setup lang="ts">
const { data: global_navigation } = await useGlobalNavigation();
</script>

<template>
  <nav
    v-if="global_navigation?.data?.links"
    class="flex flex-wrap justify-end lg:justify-start gap-4 px-4 md:pt-[0.6rem] md:pb-2 pt-4 pb-4 bg-white dark:bg-black h-fit w-fit"
  >
    <template
      v-for="(item, index) in global_navigation.data.links"
      :key="index"
    >
      <PrismicLink :field="item.link" class="leading-none text-sm" />
    </template>
  </nav>
</template>
