<script setup lang="ts">
const { data: global_navigation } = await useGlobalNavigation();
</script>

<template>
  <nav v-if="global_navigation?.data?.links">
    <!-- Mobile Menu - Simple list -->
    <div
      class="lg:hidden flex flex-col gap-2 px-4 pt-3 pb-3 bg-white dark:bg-black"
    >
      <template
        v-for="(item, index) in global_navigation.data.links"
        :key="index"
      >
        <PrismicLink
          :field="item.link"
          class="text-sm text-right hover:opacity-70 transition-opacity"
        />
      </template>
    </div>

    <!-- Desktop Menu -->
    <div
      class="hidden lg:flex flex-wrap justify-start gap-4 px-4 md:pt-[0.6rem] md:pb-2 pt-4 pb-4 bg-white dark:bg-black h-fit w-fit"
    >
      <template
        v-for="(item, index) in global_navigation.data.links"
        :key="index"
      >
        <PrismicLink :field="item.link" class="leading-none text-sm" />
      </template>
    </div>
  </nav>
</template>
