<script setup lang="ts">
const { formatCurrency } = useCurrency();

const prismic = usePrismic();
const route = useRoute();
const { data: art_piece } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID("art_piece", route.params.uid as string)
);

const { data: art_pieces } = await useLazyAsyncData("art_pieces_count", () =>
  prismic.client.getAllByType("art_piece")
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

// Draggable scroll functionality for artwork slider
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const currentElement = ref<HTMLElement | null>(null);

const handleMouseDown = (e: MouseEvent) => {
  const element = e.currentTarget as HTMLElement;
  isDragging.value = true;
  currentElement.value = element;
  startX.value = e.pageX - element.offsetLeft;
  scrollLeft.value = element.scrollLeft;
  element.style.cursor = "grabbing";
  e.preventDefault();
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !currentElement.value) return;
  e.preventDefault();

  const element = currentElement.value;
  const x = e.pageX - element.offsetLeft;
  const walk = (x - startX.value) * 2;
  element.scrollLeft = scrollLeft.value - walk;
};

const handleMouseUp = () => {
  if (currentElement.value) {
    currentElement.value.style.cursor = "grab";
  }
  isDragging.value = false;
  currentElement.value = null;
};

// Add global event listeners for slider
onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});
</script>

<template>
  <div>
    <section>
      <div class="relative grid grid-cols-12 gap-4">
        <div
          class="bg-black p-4 col-span-12 flex justify-center items-center h-[calc(100vh-72px)]"
        >
          <NuxtImg
            :src="art_piece?.data.artwork.url || ''"
            loading="eager"
            format="avif"
            quality="70"
            fit="contain"
            class="h-full object-contain"
          />
        </div>
        <div
          class="col-span-12 flex flex-col justify-center items-center gap-4 pb-24"
        >
          <h1>{{ art_piece?.data.title }}</h1>
          <div v-if="art_piece?.data.description">
            <PrismicRichText
              :field="art_piece.data.description"
              wrapper="div"
            />
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

    <div class="fixed bottom-0 right-0 left-0 bg-black p-4">
      <div
        class="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing flex flex-wrap justify-center gap-2 align-top scrollbar-hide"
        @mousedown="handleMouseDown"
      >
        <NuxtLink
          v-for="artwork in art_pieces"
          :key="artwork.id"
          :to="`/work/${artwork.uid}`"
          class="flex-shrink-0 h-10 hover:opacity-80 transition-opacity"
          @mousedown.stop
        >
          <NuxtImg
            :src="artwork.data.artwork.url || ''"
            :alt="
              artwork.data.artwork.alt ||
              `Artwork by ${artwork.data.title || 'David Wilson'}`
            "
            format="avif"
            quality="70"
            height="80"
            fit="contain"
            class="h-full"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
