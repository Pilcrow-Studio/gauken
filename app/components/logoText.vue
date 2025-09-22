<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const isHome = computed(() => route.path === "/");

const prismic = usePrismic();
const { data: art_pieces } = await useLazyAsyncData("art_pieces_count", () =>
  prismic.client.getAllByType("art_piece")
);
const art_piece_count = art_pieces.value?.length ?? 0;

const random_art_piece = computed(() => {
  return art_pieces.value?.[
    Math.floor(Math.random() * art_pieces.value.length)
  ];
});
</script>

<template>
  <div class="flex flex-col absolute top-0 left-0 z-[9999]">
    <NuxtLink
      to="/"
      class="logo-text text-[calc(14vw-1.5rem)] tracking-[-0.055em] uppercase leading-none hover:no-underline"
    >
      Gauken
    </NuxtLink>
    <div v-if="isHome" class="ml-[20%]">
      <NuxtLink to="/work"
        >see all
        <ClientOnly>
          <span v-if="random_art_piece" class="p-2"
            ><NuxtImg
              format="avif"
              :src="random_art_piece.data.artwork.url ?? ''"
              class="w-8 h-10 inline-block"
              height="40"
              quality="70"
          /></span>
        </ClientOnly>
        work
        <sup class="text-xs"> [{{ art_piece_count }}]</sup>
        →</NuxtLink
      >
    </div>
  </div>
</template>
