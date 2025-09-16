<script setup lang="ts">
const { formatCurrency } = useCurrency();

const prismic = usePrismic();
const route = useRoute();
const { data: art_piece } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID("art_piece", route.params.uid as string)
);

// Set cache tags for on-demand revalidation
if (art_piece.value?.id) {
  const { ssrContext } = useNuxtApp();
  if (ssrContext && ssrContext.res) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ssrContext.res as any).setHeader(
      "Netlify-Cache-Tag",
      `art-piece-${art_piece.value.id}`
    );
  }
}

useSeoMeta({
  title: art_piece.value?.data.meta_title,
  description: art_piece.value?.data.meta_description,
  ogTitle: art_piece.value?.data.meta_title,
  ogDescription: art_piece.value?.data.meta_description,
  ogImage: art_piece.value?.data.meta_image?.url,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: art_piece.value?.data.meta_title,
  twitterDescription: art_piece.value?.data.meta_description,
  twitterImage: art_piece.value?.data.meta_image?.url,
});

definePageMeta({
  layout: "artwork",
});
</script>

<template>
  <div>
    <section>
      <div class="relative grid grid-cols-8 gap-4">
        <div class="art-container bg-gray-100 p-4 col-span-6">
          <div id="art-piece-image" class="art-image mb-4 shadow-md">
            <NuxtImg
              v-if="art_piece?.data.artwork?.url"
              format="avif"
              :src="art_piece.data.artwork.url"
              height="500"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div
          class="sticky top-0 col-span-2 py-4 border-t border-b border-gray-200"
        >
          <h1>{{ art_piece?.data.title }}</h1>
          <div v-if="art_piece?.data.description">
            <PrismicRichText :field="art_piece.data.description" />
          </div>
          <p v-if="art_piece?.data.size" class="text-sm mt-2">
            {{ art_piece!.data.size }}
          </p>
          <p v-if="art_piece?.data.price" class="text-sm mt-2">
            {{ formatCurrency(art_piece.data.price) }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
