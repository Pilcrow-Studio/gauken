<script setup lang="ts">
import { components } from "~/slices";

// const { formatCurrency } = useCurrency();

const isGlobalHovered = inject("isGlobalHovered", ref(false));

const prismic = usePrismic();

// Load front page data lazily (non-critical for initial render)
const { data: front_page } = useLazyAsyncData(
  "front_page_index",
  () => prismic.client.getSingle("front_page"),
  {
    server: true,
    default: () => null,
  }
);

// Load only the first art piece immediately for hero image
const { data: first_art_piece } = await useAsyncData(
  "first_art_piece_home",
  () =>
    prismic.client.getAllByType("art_piece", {
      filters: [prismic.filter.at("my.art_piece.medium", "Painting")],
      limit: 1,
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
    }),
  {
    server: true,
    default: () => [],
  }
);

// Load all 3 art pieces lazily, then we'll split them
const { data: all_art_pieces } = useLazyAsyncData(
  "all_art_pieces_home",
  () =>
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
    }),
  {
    server: true,
    default: () => [],
  }
);

// Combine first piece (immediate) with remaining pieces (lazy)
const art_pieces = computed(() => {
  // If we have all pieces loaded lazily, use those
  if (all_art_pieces.value && all_art_pieces.value.length > 0) {
    return all_art_pieces.value;
  }
  // Otherwise, show just the first piece while others load
  return first_art_piece.value || [];
});

// Navigation function for artwork clicks
const navigateToWork = () => {
  navigateTo("/work");
};

// Simplified cache tags for better performance
const { ssrContext } = useNuxtApp();
if (ssrContext && ssrContext.res) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (ssrContext.res as any).setHeader("Netlify-Cache-Tag", "homepage");
}

// Optimize head with computed values to avoid reactive re-execution
const metaTitle = computed(() => front_page.value?.data?.meta_title || "Home");
const metaDescription = computed(
  () => front_page.value?.data?.meta_description || ""
);
const metaImage = computed(() => front_page.value?.data?.meta_image?.url || "");

useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content: metaDescription,
    },
    {
      property: "og:title",
      content: metaTitle,
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:image",
      content: metaImage,
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
      content: metaTitle,
    },
    {
      name: "twitter:description",
      content: metaDescription,
    },
    {
      name: "twitter:image",
      content: metaImage,
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
              :field="front_page?.data?.introductory_text"
              wrapper="div"
              class="mb-4"
            />
          </div>
        </div>
        <div
          class="gap-8 lg:col-start-4 col-start-1 lg:col-span-6 col-span-12 flex flex-col justify-center items-center transition-all duration-300"
        >
          <!-- Reserve space for images even when loading -->
          <template v-if="art_pieces && art_pieces.length > 0">
            <div
              v-for="(art_piece, index) in art_pieces"
              :key="art_piece.id"
              class="w-full"
            >
              <button
                class="w-full cursor-pointer group block"
                @click="navigateToWork"
              >
                <div
                  class="w-full max-w-[800px] mx-auto h-[400px] sm:h-[400px] lg:h-[800px]"
                  style="aspect-ratio: 1"
                >
                  <NuxtImg
                    :src="art_piece.data.artwork.url || ''"
                    format="webp,avif"
                    :quality="index === 0 ? 60 : 80"
                    height="800"
                    width="800"
                    sizes="sm:400px lg:800px"
                    placeholder
                    placeholder-class="w-full h-full bg-gray-100 animate-pulse block"
                    :loading="index === 0 ? 'eager' : 'lazy'"
                    :fetchpriority="index === 0 ? 'high' : 'auto'"
                    fit="contain"
                    :preload="index === 0"
                    :alt="
                      art_piece.data.artwork.alt ||
                      `Artwork by ${art_piece.data.title || 'David Wilson'}`
                    "
                    class="w-full h-full object-contain block"
                    style="aspect-ratio: 1"
                  />
                </div>
              </button>
            </div>
          </template>
          <!-- Fallback skeleton when data is loading -->
          <template v-else>
            <div v-for="n in 3" :key="`skeleton-${n}`" class="w-full">
              <div
                class="w-full max-w-[800px] mx-auto h-[400px] sm:h-[400px] lg:h-[800px] bg-gray-100 animate-pulse"
                style="aspect-ratio: 1"
              />
            </div>
          </template>
        </div>

        <div
          v-if="front_page?.data?.slices && front_page.data.slices.length > 0"
          class="col-start-1 col-span-12 lg:col-start-4 lg:col-span-6 flex flex-col justify-center items-center transition-all duration-300 mt-16"
        >
          <SliceZone
            :slices="front_page?.data?.slices ?? []"
            :components="components"
          />
        </div>
      </div>
    </div>
  </div>
</template>
