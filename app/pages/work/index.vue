<script setup lang="ts">
const prismic = usePrismic();
const route = useRoute();
const router = useRouter();

// Reactive state for column layout (true = large view, false = small view)
const isLargeView = ref(false);

// Lightbox state
const isLightboxOpen = ref(false);
const currentArtworkIndex = ref(0);

// Load saved preference from localStorage on client-side
onMounted(() => {
  if (import.meta.client) {
    const savedView = localStorage.getItem("work-grid-view");
    if (savedView !== null) {
      isLargeView.value = savedView === "true";
    }

    // Check for artwork parameter in URL
    const artworkUid = route.query.artwork as string;
    if (artworkUid && art_pieces.value) {
      const index = art_pieces.value.findIndex(
        (piece) => piece.uid === artworkUid
      );
      if (index !== -1) {
        currentArtworkIndex.value = index;
        isLightboxOpen.value = true;
      }
    }
  }
});

// Watch for changes and save to localStorage
watch(isLargeView, (newValue) => {
  if (import.meta.client) {
    localStorage.setItem("work-grid-view", newValue.toString());
  }
});

const { data: work } = await useAsyncData("work", () =>
  prismic.client.getSingle("work")
);

const { data: art_pieces } = await useAsyncData("all_art_pieces", () =>
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

// Computed property for grid classes
const gridClasses = computed(() => {
  if (isLargeView.value) {
    return "grid grid-cols-1 col-start-1 col-span-12 md:grid-cols-2 gap-x-4 md:gap-x-4 gap-y-12";
  } else {
    return "grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-4 col-start-1 col-span-12 md:gap-x-4 gap-y-12 ";
  }
});

// Lightbox functions
const openLightbox = (index: number) => {
  currentArtworkIndex.value = index;
  isLightboxOpen.value = true;

  // Update URL with artwork parameter
  const artwork = art_pieces.value?.[index];
  if (artwork) {
    router.push({ query: { ...route.query, artwork: artwork.uid } });
  }
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  // Remove artwork parameter from URL
  const query = { ...route.query };
  delete query.artwork;
  router.push({ query });
};

const navigateToArtwork = (index: number) => {
  currentArtworkIndex.value = index;
};

useHead({
  title: "Work",
  meta: [
    {
      name: "description",
      content: work.value?.data.meta_description,
    },
    {
      property: "og:title",
      content: work.value?.data.meta_title,
    },
    {
      property: "og:description",
      content: work.value?.data.meta_description,
    },
    {
      property: "og:image",
      content: work.value?.data.meta_image?.url,
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
      content: work.value?.data.meta_title,
    },
    {
      name: "twitter:description",
      content: work.value?.data.meta_description,
    },
    {
      name: "twitter:image",
      content: work.value?.data.meta_image?.url,
    },
  ],
});
</script>

<template>
  <div class="grid grid-cols-12 text-center px-4">
    <!-- Layout control buttons -->
    <div
      class="col-start-10 md:col-start-2 md:col-span-3 row-start-1 mb-6 flex justify-start gap-2"
    >
      <button
        :class="[
          'text-sm font-medium transition-colors duration-200',
          !isLargeView
            ? 'text-black dark:text-white underline'
            : 'text-gray-500 hover:text-gray-700',
        ]"
        @click="isLargeView = false"
      >
        Small
      </button>
      <p>/</p>
      <button
        :class="[
          'text-sm font-medium transition-colors duration-200',
          isLargeView
            ? 'text-black dark:text-white underline'
            : 'text-gray-500 hover:text-gray-700',
        ]"
        @click="isLargeView = true"
      >
        Large
      </button>
    </div>

    <!-- Image grid -->
    <div :class="gridClasses">
      <div v-for="(art_piece, index) in art_pieces" :key="art_piece.id">
        <button
          class="w-full text-left cursor-pointer group"
          @click="openLightbox(index)"
        >
          <NuxtImg
            :src="art_piece.data.artwork.url || ''"
            :alt="art_piece.data.title || ''"
            height="1000"
            width="1000"
            sizes="sm:100vw md:800px lg:1200px"
            format="webp, avif"
            quality="70"
            fit="contain"
            placeholder
            placeholder-class="w-full h-full bg-gray-200 object-cover"
            class="transition-opacity duration-200 group-hover:opacity-80"
          />
          <div class="flex flex-col gap-2 mt-4 text-left">
            <p v-if="art_piece.data.title" class="text-lg">
              {{ art_piece.data.title }}
            </p>
            <div class="flex gap-2 text-sm text-gray-500">
              <p v-if="art_piece.data.medium_custom">
                {{ art_piece.data.medium_custom }}
              </p>
              <p v-if="art_piece.data.medium_custom && art_piece.data.size">
                |
              </p>
              <p v-if="art_piece.data.size">
                {{ art_piece.data.size }}
              </p>
            </div>
            <p v-if="art_piece.data.price" class="text-sm">
              {{ art_piece.data.price }}
            </p>
          </div>
        </button>
      </div>
    </div>

    <!-- Artwork Lightbox -->
    <ArtworkLightbox
      :art-pieces="art_pieces || null"
      :current-index="currentArtworkIndex"
      :is-open="isLightboxOpen"
      :update-url="true"
      @close="closeLightbox"
      @navigate="navigateToArtwork"
    />
  </div>
</template>
