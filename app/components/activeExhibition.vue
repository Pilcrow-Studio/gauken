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

// Format dates function
const formatExhibitionDates = (startDate: string, endDate: string) => {
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
  <div>
    <div class="bg-black text-white py-1 overflow-hidden relative">
      <div class="marquee-container">
        <div class="marquee-content">
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">come say hello</span>
        </div>
        <div class="marquee-content">
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
          <span class="marquee-text text-[10px]">upcoming exhibition</span>
        </div>
      </div>
    </div>
    <div class="bg-gray-100 p-2">
      <NuxtImg
        v-if="exhibition?.[0]?.data?.poster?.url"
        :src="exhibition?.[0]?.data?.poster?.url"
        :alt="exhibition?.[0]?.data?.poster?.alt || 'Exhibition poster'"
        format="avif"
        quality="40"
        class="mb-2 w-full h-auto"
      />
      <p class="text-sm font-medium">
        {{ exhibition?.[0]?.data?.title }}
      </p>
      <p class="text-xs text-gray-600">
        {{
          exhibition?.[0]?.data?.location?.text ||
          exhibition?.[0]?.data?.location?.url
        }}
      </p>
      <p class="text-xs text-gray-800">
        {{
          formatExhibitionDates(
            exhibition?.[0]?.data?.start_date,
            exhibition?.[0]?.data?.end_date
          )
        }}
      </p>
      <NuxtLink :to="`/exhibitions/${exhibition?.[0]?.uid}`" class="text-xs">
        More info →
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.marquee-container {
  display: flex;
  width: fit-content;
  animation: scroll 40s linear infinite;
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
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
