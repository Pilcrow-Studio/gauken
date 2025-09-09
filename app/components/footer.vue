<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: footer } = await useAsyncData('footer', () =>
  prismic.client.getSingle("footer")
)
</script>

<template>
    <SliceZone
      :slices="footer?.data.slices ?? []"
      :components="components"
    />
</template>