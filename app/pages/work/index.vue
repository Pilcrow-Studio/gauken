<script setup lang="ts">
const prismic = usePrismic();

const { data: work } = await useAsyncData("work", () =>
  prismic.client.getSingle("work")
);

const { data: art_pieces } = await useAsyncData("all_art_pieces", () =>
  prismic.client.getAllByType("art_piece", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  })
);

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
  <div class="grid grid-cols-12 mt-24 text-center">
    <div
      class="p-4 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 col-start-1 col-span-12"
    >
      <div v-for="art_piece in art_pieces" :key="art_piece.id">
        <NuxtLink :to="`/work/${art_piece.uid}`">
          <NuxtImg
            :src="art_piece.data.artwork.url || ''"
            :alt="art_piece.data.title || ''"
            format="avif"
            width="1000"
            quality="70"
            fit="contain"
            placeholder
            placeholder-class="w-full h-full bg-gray-200 object-cover"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
