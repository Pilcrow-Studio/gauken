<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.BigCenteredTextSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section>
    <PrismicRichText
      :field="slice.primary.text"
      wrapper="div"
      class="bigRichTextCentered"
    />
  </section>
</template>
