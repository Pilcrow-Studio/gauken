import gsap from 'gsap';

import { useTransitionComposable } from '../composables/transition-composable';

const { toggleTransitionComplete } = useTransitionComposable();

const pageTransition = {
  name: 'page-transition',
  mode: 'out-in',
  onEnter: (el, done) => {
    gsap.set(el, {
      autoAlpha: 0,
      position: 'fixed',
      zIndex: 2,
      top: 0,
      left: 0,
      right: 0,
    });

    gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.set(el, { position: 'absolute' });
        toggleTransitionComplete(true);
        done();
      }
    })
    .to(el, { autoAlpha: 1, duration: 0.3, ease: "power1.out" })
    .play();
  },

  onLeave: (el, done) => {
    toggleTransitionComplete(false);

    const scrollY = window.scrollY; // Capture the current scroll position

    // Keep the element in a fixed position during the transition
    gsap.set(el, { position: 'fixed', top: -scrollY, zIndex: 1, right: 0, left: 0}); 

    gsap.timeline({
      paused: true,
      onComplete: () => {
        done();
      }
    })

    .to(el, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power1.out',
      onUpdate: () => {
        // Ensure no snapping happens while scrolling and animating
        gsap.set(el, { top: -scrollY });
      }
    })
    .play();
  },
};

export default pageTransition;