<script setup lang="ts">
import { components } from "~/slices";

import { motion } from "motion-v";

const { formatCurrency } = useCurrency();

const prismic = usePrismic();
const { data: page } = await useAsyncData("index", () =>
  prismic.client.getSingle("front_page")
);

const { data: art_pieces } = await useAsyncData("art_pieces", () =>
  prismic.client.getAllByType("art_piece")
);

useHead({
  title: page.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: page.value?.data.meta_description,
    },
    {
      property: "og:title",
      content: page.value?.data.meta_title,
    },
    {
      property: "og:description",
      content: page.value?.data.meta_description,
    },
    {
      property: "og:image",
      content: page.value?.data.meta_image?.url,
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
      content: page.value?.data.meta_title,
    },
    {
      name: "twitter:description",
      content: page.value?.data.meta_description,
    },
    {
      name: "twitter:image",
      content: page.value?.data.meta_image?.url,
    },
  ],
});

const showPreloader = ref(false);

onMounted(() => {
  const preloaderKey = "preloaderShown";
  if (!sessionStorage.getItem(preloaderKey)) {
    sessionStorage.setItem(preloaderKey, "true");
    showPreloader.value = true;
    setTimeout(() => {
      showPreloader.value = false;
      sessionStorage.setItem(preloaderKey, "true");
    }, 2000); // animation duration ms
  }
});
</script>

<template>
  <div>
    <div
      v-if="showPreloader"
      class="fixed inset-0 bg-black flex items-center justify-center"
    >
      <div
        class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"
      ></div>
    </div>
    <div class="min-h-screen">
      <section>
        <div class="w-full flex flex-row gap-4">
          <div class="grid grid-cols-3 w-full gap-4">
            <div
              v-for="art_piece in art_pieces"
              :key="art_piece.id"
              class="mb-8 max-w-[500px]"
            >
              <NuxtLink :to="`/work/${art_piece.uid}`">
                <div
                  v-if="art_piece?.data.artwork?.url"
                  id="art-piece-image"
                  class="art-image mb-4 shadow-md"
                >
                  <NuxtImg
                    format="avif"
                    :src="art_piece.data.artwork.url"
                    height="500"
                    sizes="mobile:380px tablet:512px desktop:50vw"
                    class="w-full h-full object-cover rounded-sm"
                  />
                </div>
                <p v-if="art_piece?.data.title" class="text-md font-serif">
                  {{ art_piece!.data.title }}
                </p>
                <p
                  v-if="art_piece?.data.price"
                  class="font-mono uppercase text-sm mt-2"
                >
                  {{ formatCurrency(art_piece.data.price) }}
                </p>
                <p v-if="art_piece?.data.size" class="text-sm mt-2">
                  {{ art_piece!.data.size }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <motion.div
            :initial="{
              y: 40,
              opacity: 0,
            }"
            :animate="{
              y: 0,
              opacity: 1,
              transition: { duration: 0.5 },
            }"
          >
            <h1 class="text-4xl font-bold">Home</h1>
          </motion.div>
        </div>
      </section>
      <SliceZone :slices="page?.data.slices ?? []" :components="components" />
    </div>
  </div>
</template>
