<script setup lang="ts">
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const route = useRoute();
const prismic = usePrismic();

const { data: page } = await useAsyncData("front_page", () =>
  prismic.client.getSingle("front_page")
);

const { data: art_piece } = await useAsyncData(
  () => (route.params.uid ? `art_piece_${route.params.uid}` : "no_art_piece"),
  () => {
    if (route.params.uid && route.path.startsWith("/work/")) {
      return prismic.client.getByUID("art_piece", route.params.uid as string);
    }
    return Promise.resolve(null);
  },
  {
    watch: [() => route.params.uid, () => route.path],
  }
);

// Map routes to display text
const getPageText = (path: string): string => {
  if (path === "/") return page.value?.data.title ?? "Gauken";
  if (path === "/bio")
    return "David Wilson is a painter and sculptor based in Oslo, Norway";
  if (path.startsWith("/work/")) {
    const title = art_piece.value?.data.title;
    // Debug logging
    if (typeof window !== "undefined") {
      console.log("Path:", path);
      console.log("Route params:", route.params);
      console.log("Art piece value:", art_piece.value);
      console.log("Art piece title:", title);
    }
    return title ?? "Work";
  }
  if (path.startsWith("/exhibitions/")) return "Exhibitions";
  // For dynamic pages, extract the uid from the path
  if (path.startsWith("/") && path !== "/") {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 1 && segments[0]) {
      // Capitalize first letter of the uid
      return segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
    }
  }
  return "Gauken"; // fallback
};

const animateText = (newText: string) => {
  gsap.to("#header-text", {
    text: newText,
    duration: 1,
    ease: "steps(8)",
  });
};

// Create a computed property for the current text
const currentText = computed(() => getPageText(route.path));

onMounted(() => {
  animateText(currentText.value);
});

// Watch for changes in the computed text and animate
watch(currentText, (newText) => {
  animateText(newText);
});
</script>

<template>
  <h1 id="header-text" class="text-4xl font-bold">Gauken</h1>
</template>
