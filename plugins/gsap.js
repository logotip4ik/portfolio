import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default defineNuxtPlugin({
  parallel: true,
  order: -1, // ensures that this plugin runs before smooth-scroll
  setup() {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    return { provide: { gsap, ScrollToPlugin, ScrollTrigger } };
  },
});
