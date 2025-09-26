<script setup lang="ts">
const prismic = usePrismic();
const route = useRoute();
const { formatExhibitionDateRange } = useDateFormat();

const { data: exhibition } = await useLazyAsyncData(
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
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div class="col-start-1 lg:col-span-3 h-full relative">
      <NuxtImg
        :src="exhibition?.data.poster?.url || ''"
        format="avif"
        quality="70"
        loading="eager"
        fit="contain"
        height="150"
        class=""
      />
      <div>
        <h1 class="text-4xl mb-4 pt-4">{{ exhibition?.data.title }}</h1>
        <div class="mb-4 bg-gray-100 dark:bg-zinc-900 p-4">
          <div
            v-if="
              exhibition?.data.location &&
              exhibition.data.location.link_type === 'Web' &&
              exhibition.data.location.url
            "
          >
            <NuxtLink :to="exhibition.data.location.url" target="_blank">
              {{ exhibition.data.location.text }}
            </NuxtLink>
          </div>
          <div v-if="exhibition?.data.start_date && exhibition?.data.end_date">
            <p class="text-xs">
              {{
                formatExhibitionDateRange(
                  exhibition.data.start_date,
                  exhibition.data.end_date
                )
              }}
            </p>
          </div>
        </div>

        <div v-if="exhibition?.data.description" class="max-w-lg">
          <PrismicRichText
            :field="exhibition.data.description"
            wrapper="div"
            class="richtext"
          />
        </div>
      </div>
    </div>
    <div class="col-start-1 lg:col-span-9 h-fit">
      <div
        v-if="exhibition?.data.exhibition_artworks"
        class="grid grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="(artwork, index) in exhibition?.data.exhibition_artworks"
          :key="`${exhibition?.id}-artwork-${index}`"
        >
          <NuxtImg
            :src="
              (artwork.artworks as any)?.artwork?.url ||
              (artwork.artworks as any)?.data?.artwork?.url ||
              ''
            "
            width="460"
            format="avif"
            quality="70"
            fit="contain"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
