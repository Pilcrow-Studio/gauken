<script setup lang="ts">
const prismic = usePrismic();
const { data: art_pieces } = await useAsyncData("art_pieces", () =>
  prismic.client.getAllByType("art_piece", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  })
);
</script>

<template>
  <div class="grid grid-cols-12 mt-24 text-center">
    <div
      class="p-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 col-start-1 col-span-12"
    >
      <div v-for="art_piece in art_pieces" :key="art_piece.id">
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
      </div>
    </div>
  </div>
</template>
