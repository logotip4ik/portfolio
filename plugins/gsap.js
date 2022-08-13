import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  return { provide: { gsap, ScrollToPlugin, ScrollTrigger } };
});
