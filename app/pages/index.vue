<script setup lang="ts">
import { components } from "~/slices";

// const { formatCurrency } = useCurrency();

const isGlobalHovered = inject("isGlobalHovered", ref(false));

const prismic = usePrismic();
// Use lazy loading for non-critical data to prevent blocking
const { data: front_page } = await useLazyAsyncData("index", () =>
  prismic.client.getSingle("front_page")
);

// Load art pieces immediately for faster first image loading (limited for display)
const { data: art_pieces } = await useLazyAsyncData("art_pieces", () =>
  prismic.client.getAllByType("art_piece", {
    filters: [prismic.filter.at("my.art_piece.medium", "Painting")],
    limit: 3,
    orderings: [
      {
        field: "my.art_piece.medium",
        direction: "desc",
      },
      {
        field: "document.first_publication_date",
        direction: "desc",
      },
    ],
  })
);

// Load all art pieces for lightbox navigation
const { data: all_art_pieces } = await useLazyAsyncData("all_art_pieces", () =>
  prismic.client.getAllByType("art_piece", {
    orderings: [
      {
        field: "my.art_piece.medium",
        direction: "desc",
      },
      {
        field: "document.first_publication_date",
        direction: "desc",
      },
    ],
  })
);

// Lightbox state
const isLightboxOpen = ref(false);
const currentArtworkIndex = ref(0);

// Lightbox functions
const openLightbox = (artworkUid: string) => {
  if (!all_art_pieces.value) return;

  const index = all_art_pieces.value.findIndex(
    (piece) => piece.uid === artworkUid
  );
  if (index !== -1) {
    currentArtworkIndex.value = index;
    isLightboxOpen.value = true;
  }
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
};

const navigateToArtwork = (index: number) => {
  currentArtworkIndex.value = index;
};

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
          <div v-for="(art_piece, index) in art_pieces" :key="art_piece.id">
            <button
              class="w-full cursor-pointer group"
              @click="openLightbox(art_piece.uid)"
            >
              <NuxtImg
                :src="art_piece.data.artwork.url || ''"
                format="webp,avif"
                :quality="index === 0 ? 60 : 80"
                height="800"
                width="800"
                sizes="sm:400px lg:800px"
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
                class=""
              />
            </button>
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

    <!-- Artwork Lightbox -->
    <ArtworkLightbox
      :art-pieces="all_art_pieces || null"
      :current-index="currentArtworkIndex"
      :is-open="isLightboxOpen"
      :update-url="false"
      @close="closeLightbox"
      @navigate="navigateToArtwork"
    />
  </div>
</template>
