<script setup lang="ts">

const prismic = usePrismic()
const route = useRoute()
const { data: exhibition } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('exhibitions', route.params.uid as string)
)

useHead({
  title: exhibition.value?.data.title || 'Exhibition'
})

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  
  return `${day}/${month}/${year} ${hours}:${minutes}`
}
</script>

<template>
    <div>
        <h1>{{ exhibition?.data.title }}</h1>
        <div v-if="exhibition?.data.description">
          <PrismicRichText :field="exhibition.data.description" />
        </div>
        <div v-if="exhibition?.data.cover_image">
          <PrismicImage :field="exhibition.data.cover_image" />
        </div>
        <div v-if="exhibition?.data.date_and_time">
          <p>Date: {{ formatDateTime(exhibition.data.date_and_time) }}</p>
        </div>
        <div v-if="exhibition?.data.location">
          <p>Location: {{ exhibition.data.location.latitude }}, {{ exhibition.data.location.longitude }}</p>
        </div>
    </div>
</template>