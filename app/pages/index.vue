<script setup lang="ts">
import { components } from '~/slices'

import { motion } from 'motion-v'
// import transitionConfig from '~/helpers/transitionConfig';

console.log("is this staging?");


const prismic = usePrismic()
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home')
)

const { data: art_pieces } = await useAsyncData('art_pieces', () =>
  prismic.client.getAllByType('art_piece')
)

useHead({
  title: prismic.asText(page.value?.data.title)
})

/*
definePageMeta({
  pageTransition: transitionConfig as never,
});
*/
</script>


<template>
  <div>
    <div class="min-h-screen">
      <section>
      <div class="w-full flex flex-row gap-4">
        <div class="grid grid-cols-3 w-full gap-4">
            <div v-for="art_piece in art_pieces" :key="art_piece.id" class="mb-8 max-w-[500px]">
              <NuxtLink :to="`/work/${art_piece.uid}`">
                <div id="art-piece-image" class="art-image mb-4 shadow-md">
                  <PrismicImage v-if="art_piece?.data.artwork" :field="art_piece!.data.artwork" :imgix-params="{ fm: 'avif', q: 60 }" />
                </div>
                <p v-if="art_piece?.data.title" class="text-md">{{ art_piece!.data.title }}</p>
                <p v-if="art_piece?.data.price" class="font-mono uppercase text-sm mt-2">
                  {{ new Intl.NumberFormat('no-NO', {
                    style: 'decimal',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(art_piece!.data.price) }},- NOK
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
              transition: { duration: 0.5 }
            }"
          >
            <h1 class="text-4xl font-bold">Home</h1>
          </motion.div>
        </div>
      </section>
      <SliceZone
        :slices="page?.data.slices ?? []"
        :components="components"
      />
    </div>
  </div>
</template>
