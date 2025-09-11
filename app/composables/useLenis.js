import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollTrigger } from './useScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export const useLenis = () => {
  let lenis = null
  const { refresh: refreshScrollTrigger } = useScrollTrigger()

  const initLenis = (options = {}) => {
    if (import.meta.client && !lenis) {
      lenis = new Lenis({
        duration: 0.7,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        ...options
      })

      // Connect Lenis with ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      // Use GSAP ticker for better performance
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)

      // Listen for route changes to update Lenis
      const router = useRouter()
      router.afterEach(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true })
          // Use the global ScrollTrigger refresh method
          refreshScrollTrigger()
        }
      })
    }
    return lenis
  }

  const destroyLenis = () => {
    if (lenis) {
      // Remove GSAP ticker listener
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
      
      // Destroy Lenis instance
      lenis.destroy()
      lenis = null
    }
  }

  const scrollTo = (target, options = {}) => {
    if (lenis) {
      lenis.scrollTo(target, options)
    }
  }

  const stop = () => {
    if (lenis) {
      lenis.stop()
    }
  }

  const start = () => {
    if (lenis) {
      lenis.start()
    }
  }

  return {
    lenis: readonly(ref(lenis)),
    initLenis,
    destroyLenis,
    scrollTo,
    stop,
    start
  }
}
