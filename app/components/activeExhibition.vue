<script setup lang="ts">
const prismic = usePrismic();
const { data: exhibition } = await useAsyncData("exhibition", () =>
  prismic.client.getAllByType("exhibitions", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    limit: 1,
  })
);

const route = useRoute();

const isExhibitionActive = computed(() => {
  return route.path.startsWith("/exhibitions/");
});

// Format dates function
const formatExhibitionDates = (
  startDate: string | undefined,
  endDate: string | undefined
) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatDay = (date: Date) => {
    return date.getDate().toString().padStart(2, "0");
  };

  const formatMonth = (date: Date) => {
    return (date.getMonth() + 1).toString().padStart(2, "0");
  };

  const startFormatted = `${formatDay(start)}/${formatMonth(start)}`;
  const endFormatted = `${formatDay(end)}/${formatMonth(end)}`;
  const year = end.getFullYear();

  return `${startFormatted} - ${endFormatted} ${year}`;
};
</script>

<template>
  <NuxtLink
    v-if="exhibition?.[0]?.uid"
    :to="`/exhibitions/${exhibition?.[0]?.uid}`"
    class="exhibition-link hover:no-underline"
  >
    <div
      class="bg-black dark:bg-white text-white dark:text-black py-1 overflow-hidden relative"
    >
      <div class="marquee-container">
        <div class="marquee-content">
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
        </div>
        <div class="marquee-content" aria-hidden="true">
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 dark:bg-zinc-900 p-2">
      <NuxtImg
        v-if="exhibition?.[0]?.data?.poster?.url"
        :src="exhibition?.[0]?.data?.poster?.url"
        :alt="exhibition?.[0]?.data?.poster?.alt || 'Exhibition poster'"
        format="avif"
        quality="70"
        height="200"
        class="mb-2 w-full h-auto"
      />
      <div class="flex flex-col items-center text-center">
        <p class="text-sm">
          {{ exhibition?.[0]?.data?.title }}
        </p>
        <p class="text-xs">
          {{
            exhibition?.[0]?.data?.location?.text ||
            (exhibition?.[0]?.data?.location as any)?.url
          }}
        </p>
        <p class="text-xs">
          {{
            formatExhibitionDates(
              exhibition?.[0]?.data?.start_date as string,
              exhibition?.[0]?.data?.end_date as string
            )
          }}
        </p>
        <p v-if="!isExhibitionActive" class="text-xs">More info →</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.marquee-container {
  display: flex;
  width: fit-content;
  animation: scroll 25s linear infinite;
}

.marquee-content {
  display: flex;
  white-space: nowrap;
  flex-shrink: 0;
}

.marquee-text {
  display: inline-block;
  padding-right: 0.75rem;
  flex-shrink: 0;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
