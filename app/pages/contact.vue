<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();

const { data: contact } = await useAsyncData("contact", () =>
  prismic.client.getSingle("contact")
);

useHead({
  title: "Contact",
  meta: [
    {
      name: "description",
      content: contact.value?.data.meta_description,
    },
    {
      property: "og:title",
      content: contact.value?.data.meta_title,
    },
    {
      property: "og:description",
      content: contact.value?.data.meta_description,
    },
    {
      property: "og:image",
      content: contact.value?.data.meta_image?.url,
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
      content: contact.value?.data.meta_title,
    },
    {
      name: "twitter:description",
      content: contact.value?.data.meta_description,
    },
    {
      name: "twitter:image",
      content: contact.value?.data.meta_image?.url,
    },
  ],
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 text-center">
    <div class="flex flex-col gap-8 col-start-1 lg:col-start-4 lg:col-span-6">
      <SliceZone
        :slices="contact?.data.slices ?? []"
        :components="components"
      />
      <NuxtLink to="mailto:david@gauken.art" class="text-5xl"
        >david@gauken.art</NuxtLink
      >
      <NuxtLink
        to="https://www.instagram.com/gaukenart/"
        target="_blank"
        class="text-5xl"
        >Instagram</NuxtLink
      >
    </div>
  </div>
</template>
