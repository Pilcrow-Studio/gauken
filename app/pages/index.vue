<script setup lang="ts">
import { components } from "~/slices";

// const { formatCurrency } = useCurrency();

const isGlobalHovered = inject("isGlobalHovered", ref(false));

const prismic = usePrismic();
// Use lazy loading for non-critical data to prevent blocking
const { data: front_page } = await useLazyAsyncData("index", () =>
  prismic.client.getSingle("front_page")
);

// Load art pieces immediately for faster first image loading
const { data: art_pieces } = await useLazyAsyncData("art_pieces", () =>
  prismic.client.getAllByType("art_piece", {
    limit: 3,
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  })
);

// Set cache tags for on-demand revalidation
const { ssrContext } = useNuxtApp();
if (ssrContext && ssrContext.res) {
  // Tag with front page ID
  if (front_page.value?.id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ssrContext.res as any).setHeader(
      "Netlify-Cache-Tag",
      `front-page-${front_page.value.id}`
    );
  }

  // Tag with all art piece IDs (for when any art piece changes)
  if (art_pieces.value?.length) {
    const artPieceTags = art_pieces.value
      .map((piece) => `art-piece-${piece.id}`)
      .join(",");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ssrContext.res as any).setHeader(
      "Netlify-Cache-Tag",
      `homepage,${artPieceTags}`
    );
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ssrContext.res as any).setHeader("Netlify-Cache-Tag", "homepage");
  }
}

useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content: front_page.value?.data.meta_description,
    },
    {
      property: "og:title",
      content: front_page.value?.data.meta_title,
    },
    {
      property: "og:description",
      content: front_page.value?.data.meta_description,
    },
    {
      property: "og:image",
      content: front_page.value?.data.meta_image?.url,
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
      content: front_page.value?.data.meta_title,
    },
    {
      name: "twitter:description",
      content: front_page.value?.data.meta_description,
    },
    {
      name: "twitter:image",
      content: front_page.value?.data.meta_image?.url,
    },
  ],
});
</script>

<template>
  <div>
    <div>
      <div class="grid lg:grid-cols-12 grid-cols-1">
        <div
          class="col-start-1 col-span-12 lg:col-span-2 transition-opacity duration-300"
          :class="{ 'opacity-30': isGlobalHovered }"
        >
          <div class="text-lg tracking-tight max-w-prose">
            <PrismicRichText
              :field="front_page?.data.introductory_text"
              wrapper="div"
              class="mb-4"
            />
          </div>
        </div>
        <div
          class="gap-8 lg:col-start-4 col-start-1 lg:col-span-6 col-span-12 flex flex-col justify-center items-center transition-all duration-300"
        >
          <div
            v-for="(art_piece, index) in art_pieces"
            :key="art_piece.id"
            class="cursor-pointer"
            @mouseenter="isGlobalHovered = false"
            @mouseleave="isGlobalHovered = false"
          >
            <NuxtLink :to="`/work/${art_piece.uid}`">
              <NuxtImg
                :src="art_piece.data.artwork.url || ''"
                format="webp,avif"
                :quality="index === 0 ? 70 : 80"
                height="1000"
                width="1000"
                sizes="sm:100vw md:800px lg:1200px"
                placeholder
                placeholder-class="h-[1000px] w-[1000px] bg-red-600 object-cover"
                :loading="index === 0 ? 'eager' : 'lazy'"
                :fetchpriority="index === 0 ? 'high' : 'auto'"
                fit="contain"
                :preload="index === 0"
                :alt="
                  art_piece.data.artwork.alt ||
                  `Artwork by ${art_piece.data.title || 'David Wilson'}`
                "
              />
            </NuxtLink>
          </div>
        </div>

        <div
          v-if="front_page?.data.slices && front_page.data.slices.length > 0"
          class="col-start-1 col-span-12 lg:col-start-4 lg:col-span-6 flex flex-col justify-center items-center transition-all duration-300 mt-16"
        >
          <SliceZone
            :slices="front_page?.data.slices ?? []"
            :components="components"
          />
        </div>
      </div>
    </div>
  </div>
</template>
