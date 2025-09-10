<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const route = useRoute()
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('page', route.params.uid as string)
)

useHead({
  title: page.value?.data.meta_title,
  meta: [
    {
      name: 'description',
      content: page.value?.data.meta_description
    },
    {
      property: 'og:title',
      content: page.value?.data.meta_title
    },
    {
      property: 'og:description',
      content: page.value?.data.meta_description
    },
    {
      property: 'og:image',
      content: page.value?.data.meta_image?.url
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: page.value?.data.meta_title
    },
    {
      name: 'twitter:description',
      content: page.value?.data.meta_description
    },
    {
      name: 'twitter:image',
      content: page.value?.data.meta_image?.url
    }
  ]
})
</script>


<template>
  <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  />
</template>
