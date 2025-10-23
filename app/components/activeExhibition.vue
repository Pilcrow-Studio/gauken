<script setup lang="ts">
const prismic = usePrismic();
const { formatDateRange } = useDateFormat();

const { data: exhibition } = await useAsyncData(
  "exhibition",
  () =>
    prismic.client.getAllByType("exhibitions", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
      limit: 1,
    }),
  {
    server: true,
    default: () => [],
  }
);

const route = useRoute();

const isExhibitionActive = computed(() => {
  return route.path.startsWith("/exhibitions/");
});

const isExhibitionHappeningNow = computed(() => {
  if (
    !exhibition.value?.[0]?.data?.start_date ||
    !exhibition.value?.[0]?.data?.end_date
  ) {
    return false;
  }

  const now = new Date();
  const startDate = new Date(exhibition.value[0].data.start_date);
  const endDate = new Date(exhibition.value[0].data.end_date);

  // Set time to midnight for date-only comparison
  now.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return now >= startDate && now <= endDate;
});

const exhibitionStatusText = computed(() => {
  if (!exhibition.value?.[0]?.data?.end_date) {
    return "upcoming exhibition";
  }

  const now = new Date();
  const endDate = new Date(exhibition.value[0].data.end_date);

  // Set time to midnight for date-only comparison
  now.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (isExhibitionHappeningNow.value) {
    return "happening now";
  } else if (now > endDate) {
    return "last exhibition";
  } else {
    return "upcoming exhibition";
  }
});

const isExhibitionExpired = computed(() => {
  if (!exhibition.value?.[0]?.data?.end_date) {
    return false;
  }

  const now = new Date();
  const endDate = new Date(exhibition.value[0].data.end_date);

  // Set time to midnight for date-only comparison
  now.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return now > endDate;
});
</script>

<template>
  <NuxtLink
    v-if="exhibition?.[0]?.uid"
    :to="`/exhibitions/${exhibition?.[0]?.uid}`"
    class="exhibition-link hover:no-underline"
  >
    <div
      class="bg-black dark:bg-[#F5F5F4] text-white dark:text-black py-1 overflow-hidden relative"
    >
      <div class="marquee-container">
        <div class="marquee-content">
          <span class="marquee-text text-[10px]">{{
            exhibitionStatusText
          }}</span>
          <span class="marquee-text text-[10px]">{{
            isExhibitionExpired ? "last exhibition" : "come say hello"
          }}</span>
          <span class="marquee-text text-[10px]">{{
            exhibitionStatusText
          }}</span>
          <span class="marquee-text text-[10px]">{{
            isExhibitionExpired ? "last exhibition" : "come say hello"
          }}</span>
          <span class="marquee-text text-[10px]">{{
            exhibitionStatusText
          }}</span>
          <span class="marquee-text text-[10px]">{{
            isExhibitionExpired ? "last exhibition" : "come say hello"
          }}</span>
        </div>
        <div class="marquee-content" aria-hidden="true">
          <span class="marquee-text text-[10px]">{{
            exhibitionStatusText
          }}</span>
          <span class="marquee-text text-[10px]">{{
            isExhibitionExpired ? "last exhibition" : "come say hello"
          }}</span>
          <span class="marquee-text text-[10px]">{{
            exhibitionStatusText
          }}</span>
          <span class="marquee-text text-[10px]">{{
            isExhibitionExpired ? "last exhibition" : "come say hello"
          }}</span>
          <span class="marquee-text text-[10px]">{{
            exhibitionStatusText
          }}</span>
          <span class="marquee-text text-[10px]">{{
            isExhibitionExpired ? "last exhibition" : "come say hello"
          }}</span>
        </div>
      </div>
    </div>
    <div class="bg-white dark:bg-zinc-900 p-2">
      <NuxtImg
        v-if="exhibition?.[0]?.data?.poster?.url"
        :src="exhibition?.[0]?.data?.poster?.url"
        :alt="exhibition?.[0]?.data?.poster?.alt || 'Exhibition poster'"
        format="avif"
        quality="70"
        height="200"
        width="300"
        loading="lazy"
        sizes="300px"
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
            formatDateRange(
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
