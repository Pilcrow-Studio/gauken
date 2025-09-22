<script setup lang="ts">
const prismic = usePrismic();
const route = useRoute();
const { data: exhibition } = await useAsyncData(
  route.params.uid as string,
  () => prismic.client.getByUID("exhibitions", route.params.uid as string)
);

// Set cache tags for on-demand revalidation
if (exhibition.value?.id) {
  const { ssrContext } = useNuxtApp();
  if (ssrContext && ssrContext.res) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ssrContext.res as any).setHeader(
      "Netlify-Cache-Tag",
      `exhibition-${exhibition.value.id}`
    );
  }
}

// SEO Meta tags using Nuxt SEO v3
useSeoMeta({
  title: exhibition.value?.data.meta_title,
  description: exhibition.value?.data.meta_description,
  ogTitle: exhibition.value?.data.meta_title,
  ogDescription: exhibition.value?.data.meta_description,
  ogImage: exhibition.value?.data.meta_image?.url,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: exhibition.value?.data.meta_title,
  twitterDescription: exhibition.value?.data.meta_description,
  twitterImage: exhibition.value?.data.meta_image?.url,
});

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
</script>

<template>
  <div>
    <div class="h-screen flex flex-col justify-center items-center">
      <h1 class="text-4xl font-bold">{{ exhibition?.data.title }}</h1>
    </div>
    <div v-if="exhibition?.data.description">
      <PrismicRichText :field="exhibition.data.description" />
    </div>
    <div v-if="exhibition?.data.banner_image">
      <PrismicImage :field="exhibition.data.banner_image" />
    </div>
    <div v-if="exhibition?.data.start_date">
      <p>Date: {{ formatDateTime(exhibition.data.start_date) }}</p>
    </div>
  </div>
</template>
