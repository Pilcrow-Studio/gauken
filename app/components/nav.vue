<script setup lang="ts">
const prismic = usePrismic()
const { data: global_navigation } = await useLazyAsyncData('global_navigation', () =>
  prismic.client.getSingle("global_navigation")
)
</script>

<template>
  <nav v-if="global_navigation?.data?.links" class="fixed z-[9999] flex gap-4 py-4 px-4 mix-blend-difference text-red-500 left-[50%] translate-x-[-50%] top-5">
    <div v-if="global_navigation.data.logo">
      <NuxtLink to="/">
        <NuxtImg v-if="global_navigation.data.logo?.url" format="avif" :src="global_navigation.data.logo.url" height="40" width="40" class="w-10 h-10"/>
      </NuxtLink>
    </div>
    <template v-for="(item, index) in global_navigation.data.links" :key="index">
      <PrismicLink :field="item.link" />
    </template>
  </nav>
</template>