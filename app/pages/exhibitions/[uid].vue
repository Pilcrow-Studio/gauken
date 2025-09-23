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

useHead({
  title: exhibition.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: exhibition.value?.data.meta_description,
    },
    {
      property: "og:title",
      content: exhibition.value?.data.meta_title,
    },
    {
      property: "og:description",
      content: exhibition.value?.data.meta_description,
    },
    {
      property: "og:image",
      content: exhibition.value?.data.meta_image?.url,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: exhibition.value?.data.meta_title,
    },
    {
      name: "twitter:description",
      content: exhibition.value?.data.meta_description,
    },
    {
      name: "twitter:image",
      content: exhibition.value?.data.meta_image?.url,
    },
  ],
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
  <div class="grid grid-cols-12 mt-12">
    <div class="col-start-4 col-span-6">
      <div class="w-full flex justify-center align-center bg-black p-8 mb-6">
        <NuxtImg
          :src="exhibition?.data.poster?.url || ''"
          format="avif"
          quality="70"
          height="300"
          loading="eager"
          fit="contain"
        />
      </div>

      <h1 class="mb-4">{{ exhibition?.data.title }}</h1>
      <div class="mb-4">
        <div v-if="exhibition?.data.location">
          <NuxtLink
            :to="exhibition.data.location.url"
            target="_blank"
            class="font-mono text-xs"
          >
            {{ exhibition.data.location.text }}
          </NuxtLink>
        </div>
        <div v-if="exhibition?.data.start_date && exhibition?.data.end_date">
          <p class="font-mono text-xs">
            Date: {{ formatDateTime(exhibition.data.start_date) }}
          </p>
          <p class="font-mono text-xs">
            to {{ formatDateTime(exhibition.data.end_date) }}
          </p>
        </div>
      </div>
      <div v-if="exhibition?.data.description">
        <PrismicRichText :field="exhibition.data.description" />
      </div>
    </div>
  </div>
</template>
