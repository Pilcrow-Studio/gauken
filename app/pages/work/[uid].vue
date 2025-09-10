<script setup lang="ts">

const prismic = usePrismic()
const route = useRoute()
const { data: art_piece } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('art_piece', route.params.uid as string)
)

useHead({
  title: art_piece.value?.data.title || 'Work'
})

</script>

<template>
    <div>
        <h1>{{ art_piece?.data.title }}</h1>
        <div v-if="art_piece?.data.description">
          <PrismicRichText :field="art_piece.data.description" />
        </div>
        <div id="art-piece-image" class="art-image mb-4 shadow-md">
            <PrismicImage v-if="art_piece?.data.artwork" :field="art_piece!.data.artwork" :imgix-params="{ fm: 'avif', q: 60 }" />
        </div>
    </div>
</template>