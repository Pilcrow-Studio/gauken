<script setup lang="ts">
import { components } from '~/slices'
import transitionConfig from '~/helpers/transitionConfig';

import Footer from '~/components/footer.vue'

const prismic = usePrismic()
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home')
)

useHead({
  title: prismic.asText(page.value?.data.title)
})

definePageMeta({
  pageTransition: transitionConfig as never,
});
</script>


<template>
  <div>
    <div class="min-h-screen">
      <section>
        <div class="container">
          <h1 class="text-4xl font-bold">Home</h1>
        </div>
      </section>
      <SliceZone
        :slices="page?.data.slices ?? []"
        :components="components"
      />
    </div>
    <Footer />
  </div>
</template>
