<script setup lang="ts">
const prismic = usePrismic();
const { formatDateRange } = useDateFormat();

// Draggable scroll functionality
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

  // Prevent text selection during drag
  e.preventDefault();
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !currentElement.value) return;
  e.preventDefault();

  const element = currentElement.value;
  const x = e.pageX - element.offsetLeft;
  const walk = (x - startX.value) * 2; // Scroll speed multiplier
  element.scrollLeft = scrollLeft.value - walk;
};

const handleMouseUp = () => {
  if (currentElement.value) {
    currentElement.value.style.cursor = "grab";
  }
  isDragging.value = false;
  currentElement.value = null;
};

// Add global event listeners
onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});

const { data: exhibitions_overview } = await useAsyncData(
  "exhibitions_overview",
  () => prismic.client.getSingle("exhibitions_overview")
);

const { data: exhibitions } = await useAsyncData("exhibitions", () =>
  prismic.client.getAllByType("exhibitions", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  })
);

useHead({
  title: exhibitions_overview.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: exhibitions_overview.value?.data.meta_description,
    },
    {
      property: "og:title",
      content: exhibitions_overview.value?.data.meta_title,
    },
    {
      property: "og:description",
      content: exhibitions_overview.value?.data.meta_description,
    },
    {
      property: "og:image",
      content: exhibitions_overview.value?.data.meta_image?.url,
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
      content: exhibitions_overview.value?.data.meta_title,
    },
    {
      name: "twitter:description",
      content: exhibitions_overview.value?.data.meta_description,
    },
    {
      name: "twitter:image",
      content: exhibitions_overview.value?.data.meta_image?.url,
    },
  ],
});
</script>

<template>
  <div class="mt-24 text-center px-4">
    <div class="flex flex-col gap-4">
      <div v-for="exhibition in exhibitions" :key="exhibition.id" class="pb-24">
        <NuxtLink :to="`/exhibitions/${exhibition.uid}`">
          <div
            class="w-full grid grid-cols-8 md:grid-cols-12 gap-4 items-start exhibition-link hover:no-underline"
          >
            <NuxtImg
              :src="exhibition.data.poster.url || ''"
              format="avif"
              quality="70"
              height="100"
              fit="contain"
              class="col-start-1 col-span-2 md:col-span-1 md:col-start-1 lg:col-span-1"
            />
            <div
              class="text-left col-start-3 col-span-5 md:col-start-2 md:col-span-5 lg:col-start-2 lg:col-span-5"
            >
              <h2>{{ exhibition.data.title }}</h2>
              <p class="text-xs">
                {{
                  exhibition.data.location?.text ||
                  (exhibition.data.location as any)?.url
                }}
              </p>
              <p class="text-xs">
                {{
                  formatDateRange(
                    exhibition.data.start_date as string,
                    exhibition.data.end_date as string
                  )
                }}
              </p>
            </div>
          </div>
        </NuxtLink>
        <div
          class="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing flex gap-2 justify-start align-top mt-4 scrollbar-hide"
          @mousedown="handleMouseDown"
        >
          <div
            v-for="(exhibition_artworks, index) in exhibition.data
              .exhibition_artworks"
            :key="`${exhibition.id}-artwork-${index}`"
            class="flex-shrink-0 h-56"
          >
            <NuxtImg
              v-if="exhibition_artworks.artworks"
              :src="
                (exhibition_artworks.artworks as any).artwork?.url ||
                (exhibition_artworks.artworks as any).data?.artwork?.url ||
                ''
              "
              :alt="'Exhibition artwork'"
              format="avif"
              quality="70"
              height="224"
              fit="contain"
              class="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
