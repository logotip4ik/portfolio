// import ASScroll from "@ashthornton/asscroll";
// import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import Lenis from '@studio-freight/lenis';

const LOCOMOTIVE_SCROLL_BREAK_POINT = 1024;
const SCROLL_TO_DURATION_IN_SECONDS = 1.5;

export default defineNuxtPlugin(({ $gsap, $ScrollTrigger }) => {
  const scrollerEl = document.getElementById('scroller');

  window.scrollTo(0, 0);
  const lenis = new Lenis({
    smooth: true,
    smoothTouch: false,
    content: scrollerEl,
    direction: 'vertical',
    gestureDirection: 'vertical',
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    mouseMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', $ScrollTrigger.update);

  $ScrollTrigger.scrollerProxy(lenis.contentNode, {
    scrollTop(value) {
      return arguments.length ? lenis.setScroll(value) : lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  $ScrollTrigger.addEventListener('refresh', () => lenis.notify());

  if (window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT) {
    $ScrollTrigger.defaults({ scroller: lenis.contentNode });

    // NOTE: default time in gsap is in seconds, but lenis accepts time in milliseconds
    $gsap.ticker.add((time) => lenis.raf(time * 1000));
  }

  return {
    provide: { smoothScroll: makeLenisSmoothScrollAdaptor(lenis) },
  };
});

function makeLenisSmoothScrollAdaptor(lenis) {
  window.lenis = lenis;

  return {
    on: (evName, evCallback) =>
      lenis.on(evName, ({ scroll }) => evCallback({ scroll: { x: scroll } })),
    scrollY: () =>
      window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
        ? lenis.scroll
        : window.scrollY,
    update: () => lenis.notify(),
    enable: () =>
      window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
        ? lenis.start()
        : (document.body.style.overflow = 'auto'),
    disable: () =>
      window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
        ? lenis.stop()
        : (document.body.style.overflow = 'hidden'),
    scrollTo: (
      selectorOrNumber,
      durationInSeconds = SCROLL_TO_DURATION_IN_SECONDS
    ) => {
      let target = selectorOrNumber;

      if (typeof selectorOrNumber === 'string')
        target = document.querySelector(selectorOrNumber).offsetTop;

      const options = {};

      if (durationInSeconds === 0) options.immediate = true;
      else options.duration = durationInSeconds;

      lenis.scrollTo(target, options);
    },
    // window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
    //   ? lenis.scrollTo(selectorOrNumber, {
    //       duration: durationInSeconds,
    //       immediate: durationInSeconds === 0,
    //     })
    //   : gsap.to(window, {
    //       scrollTo: { y: selectorOrNumber, autoKill: true },
    //       duration: durationInSeconds,
    //       ease: 'power3.inOut',
    //     }),
  };
}

function makeLocomotiveScrollAdaptor(locomotiveScroll) {
  const scroll = { x: 0, y: 0 };

  locomotiveScroll.on('scroll', ({ scroll: { x, y } }) => {
    scroll.x = x;
    scroll.y = y;
  });

  return {
    on: (evName, evCallback) =>
      locomotiveScroll.on(evName, evCallback.bind(null, { scroll })),
    scrollY: () =>
      window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
        ? scroll.y
        : window.scrollY,
    update: () => locomotiveScroll.update(),
    enable: () =>
      window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
        ? locomotiveScroll.start()
        : (document.body.style.overflow = 'auto'),
    disable: () =>
      window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
        ? locomotiveScroll.stop()
        : (document.body.style.overflow = 'hidden'),
    scrollTo: (
      selectorOrNumber,
      durationInSeconds = SCROLL_TO_DURATION_IN_SECONDS
    ) =>
      // prettier-ignore
      window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
        ? locomotiveScroll.scrollTo(selectorOrNumber, {
          duration: durationInSeconds * 1000,
          // https://easings.net/#easeOutExpo
          easing: [0.645, 0.045, 0.355, 1.0],
          disableLerp: durationInSeconds * 1000 <= 100
        })
        : gsap.to(window, {
          scrollTo: { y: selectorOrNumber, autoKill: true },
          duration: durationInSeconds,
          ease: 'power3.inOut',
        }),
  };
}

/** @param {import('@ashthornton/asscroll').default} asscroll */
// eslint-disable-next-line
function makeASScrollAdaptor(asscroll) {
  return {
    scrollY: () =>
      asscroll.isScrollJacking ? asscroll.currentPos : window.scrollY,
    update: () => asscroll.update(),
    enable: () =>
      asscroll.isScrollJacking
        ? asscroll.enable()
        : (document.body.style.overflow = 'auto'),
    disable: () =>
      asscroll.isScrollJacking
        ? asscroll.disable()
        : (document.body.style.overflow = 'hidden'),
  };
}
