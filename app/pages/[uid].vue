<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID("page", route.params.uid as string)
);

useSeoMeta({
  title: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  ogTitle: page.value?.data.meta_title,
  ogDescription: page.value?.data.meta_description,
  ogImage: page.value?.data.meta_image?.url,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: page.value?.data.meta_title,
  twitterDescription: page.value?.data.meta_description,
  twitterImage: page.value?.data.meta_image?.url,
});
</script>

<template>
  <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  />
</template>
