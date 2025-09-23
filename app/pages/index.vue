<script setup lang="ts">
// import { components } from "~/slices";

// const { formatCurrency } = useCurrency();

const isGlobalHovered = inject("isGlobalHovered", ref(false));

const prismic = usePrismic();
const { data: page } = await useAsyncData("index", () =>
  prismic.client.getSingle("front_page")
);

const { data: art_pieces } = await useAsyncData("art_pieces", () =>
  prismic.client.getAllByType("art_piece", {
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
  if (page.value?.id) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ssrContext.res as any).setHeader(
      "Netlify-Cache-Tag",
      `front-page-${page.value.id}`
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
</script>

<template>
  <div>
    <div>
      <div class="grid grid-cols-12 pb-24">
        <div
          class="col-start-1 col-span-2 pl-4 pt-16 transition-opacity duration-300"
          :class="{ 'opacity-30': isGlobalHovered }"
        >
          <div class="text-lg tracking-tight max-w-prose">
            <PrismicRichText :field="page?.data.introductory_text" />
          </div>
        </div>
        <div
          class="bg-black col-start-4 col-span-6 flex flex-col justify-center items-center p-4 transition-all duration-300 cursor-pointer"
          @mouseenter="isGlobalHovered = true"
          @mouseleave="isGlobalHovered = false"
        >
          <NuxtImg
            v-if="art_pieces?.[0]?.data.artwork.url"
            :src="art_pieces?.[0]?.data.artwork.url"
            format="avif"
            quality="70"
            height="1000"
            loading="eager"
            fit="fit"
          />
          <p class="text-sm mt-2">{{ art_pieces?.[0]?.data.title }}</p>
        </div>
        <div
          class="col-start-4 col-span-6 flex flex-col justify-center items-center p-4 transition-all duration-300 cursor-pointer"
          @mouseenter="isGlobalHovered = true"
          @mouseleave="isGlobalHovered = false"
        >
          <NuxtImg
            v-if="art_pieces?.[1]?.data.artwork.url"
            :src="art_pieces?.[1]?.data.artwork.url"
            format="avif"
            quality="70"
            height="1000"
            loading="eager"
            fit="fit"
          />
          <p class="text-sm mt-2">{{ art_pieces?.[1]?.data.title }}</p>
        </div>
        <div
          class="col-start-4 col-span-6 py-24 flex flex-col justify-center items-center p-4 transition-all duration-300 cursor-pointer"
        >
          <p class="text-3xl mt-2 text-center mb-4">
            This is some text we can use to describe the art piece maybe we can
            make it break across multiple lines
          </p>
          <NuxtLink to="/about"> About the artist → </NuxtLink>
        </div>
      </div>
    </div>
    <!---
    <div class="min-h-screen">
      <section>
        <div class="w-full flex flex-row gap-4">
          <div class="grid grid-cols-3 w-full gap-4">
            <div
              v-for="art_piece in art_pieces ?? []"
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
                <p v-if="art_piece?.data.title" class="text-md">
                  {{ art_piece!.data.title }}
                </p>
                <p v-if="art_piece?.data.price" class="text-sm mt-2">
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
    -->
  </div>
</template>
