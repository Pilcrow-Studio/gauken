<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { gsap } from "gsap";

defineProps(
  getSliceComponentProps<Content.FooterSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

// Use a computed property to ensure consistent rendering
const currentYear = computed(() => new Date().getFullYear());

// Use the global ScrollTrigger composable
const { createScrollTrigger } = useScrollTrigger();

let scrollTriggerContext: ReturnType<typeof createScrollTrigger> | null = null;

const initScrollTrigger = () => {
  const footerElement = document.querySelector(".footer");
  const bgImageElement = document.querySelector("#footer-bg-img");

  if (footerElement && bgImageElement) {
    scrollTriggerContext = createScrollTrigger(
      "footer-bg-animation",
      {
        trigger: footerElement,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
      () => {
        gsap.from(bgImageElement, {
          autoAlpha: 0.25,
          scale: 1.2,
          duration: 1,
          ease: "steps(8)",
          scrollTrigger: {
            trigger: footerElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      }
    );
  }
};

onMounted(() => {
  initScrollTrigger();

  // Re-initialize after route changes
  const router = useRouter();
  router.afterEach(() => {
    // Clean up existing context first
    if (scrollTriggerContext) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (scrollTriggerContext as any).cleanup();
    }

    // Wait for DOM updates and global cleanup to complete
    setTimeout(() => {
      initScrollTrigger();
    }, 200);
  });
});

onUnmounted(() => {
  if (scrollTriggerContext) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (scrollTriggerContext as any).cleanup();
  }
});
</script>

<template>
  <footer class="footer relative h-screen bg-black">
    <div class="absolute inset-0 z-0 w-full h-full overflow-hidden">
      <NuxtImg
        v-if="slice.primary.background_image?.url"
        id="footer-bg-img"
        format="avif"
        :src="slice.primary.background_image.url"
        height="120%"
        class="w-full h-full object-cover"
      >
        <template #placeholder>
          <div class="w-full h-full bg-black">
            <h2>Loading...</h2>
          </div>
        </template>
      </NuxtImg>
    </div>
    <div
      class="relative h-full w-full flex flex-col justify-between px-12 pt-24"
    >
      <div class="grid grid-cols-10 z-50 mx-auto w-full text-s text-white">
        <div class="relative flex flex-col gap-4">
          <template
            v-for="(item, index) in slice.primary.external_links"
            :key="index"
          >
            <PrismicLink :field="item.external_link" />
          </template>
        </div>
        <div class="relative flex flex-col gap-4 col-start-5">
          <p>© Gauken {{ currentYear }}</p>
          <NuxtLink to="/">Home</NuxtLink>
        </div>
        <div class="relative flex flex-col gap-4 col-start-7 col-end-10">
          <p class="text-5xl">Exhibition Yin Yang at Gauken</p>
        </div>
      </div>
      <div class="relative z-50 mx-auto w-full text-xs text-white">
        <p class="text-[200px] font-medium mb-32 tracking-tight">Gauken</p>
        <div class="w-[500px] h-[200px] bg-white" />
      </div>
    </div>
  </footer>
</template>
