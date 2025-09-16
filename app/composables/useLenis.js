import { useScrollTrigger } from "./useScrollTrigger";

export const useLenis = () => {
  // eslint-disable-next-line no-unused-vars
  const { refresh: refreshScrollTrigger } = useScrollTrigger();

  // Get the global Lenis instance from the plugin
  const { $lenis } = useNuxtApp();
  const lenis = $lenis;

  const scrollTo = (target, options = {}) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    }
  };

  const stop = () => {
    if (lenis) {
      lenis.stop();
    }
  };

  const start = () => {
    if (lenis) {
      lenis.start();
    }
  };

  return {
    lenis: readonly(ref(lenis)),
    scrollTo,
    stop,
    start,
  };
};
