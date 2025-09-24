import { useScrollTrigger } from "~/composables/useScrollTrigger";

export default defineNuxtPlugin(() => {
  const { initGlobalScrollTrigger } = useScrollTrigger();

  // Initialize global ScrollTrigger management with a slight delay to not block initial render
  if (process.client) {
    setTimeout(() => {
      initGlobalScrollTrigger();
    }, 100);
  }
});
