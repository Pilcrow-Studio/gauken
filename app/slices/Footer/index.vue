<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

defineProps(
  getSliceComponentProps<Content.FooterSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

// Use a computed property to ensure consistent rendering
const currentYear = computed(() => new Date().getFullYear())

let ctx: gsap.Context | null = null;

const initScrollTrigger = () => {
  // Clean up existing context
  if (ctx) {
    ctx.revert();
  }
  
  // Wait for DOM to be ready
  nextTick(() => {
    const footerElement = document.querySelector('.footer');
    const bgImageElement = document.querySelector('#footer-bg-img');
    
    if (footerElement && bgImageElement) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        tl.from(bgImageElement, {
          autoAlpha: 0.25,
          y: "-20%",
          duration: 1,
          ease: "power1.out",
        });
      });
    }
  });
};

onMounted(() => {
  initScrollTrigger();
  
  // Refresh ScrollTrigger after route changes
  const router = useRouter()
  router.afterEach(() => {
    setTimeout(() => {
      initScrollTrigger();
    }, 100)
  })

  // Refresh ScrollTrigger on window resize
  const handleResize = () => {
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', handleResize)
  
  // Cleanup resize listener
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
});

onUnmounted(() => {
  if (ctx) {
    ctx.cleanup();
  }
});
</script>

<template>
  <footer class="footer relative h-screen bg-black">
	<div class="absolute inset-0 z-0 w-full h-full overflow-hidden">
		<PrismicImage 
			v-if="slice.primary.background_image"
      id="footer-bg-img"
			class="w-full h-[120%] object-cover" 
			:field="slice.primary.background_image"
        :imgix-params="{ fm: 'avif', q: 60 }"
      />
	</div>
    <div class="relative h-full w-full flex flex-col justify-between px-12 pt-24">
      <div class="grid grid-cols-10 z-50 mx-auto w-full text-s text-white">
        <div class="relative flex flex-col gap-4">
          <template v-for="(item, index) in slice.primary.external_links" :key="index">
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
