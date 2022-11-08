// import ASScroll from "@ashthornton/asscroll";
import { gsap } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';

const LOCOMOTIVE_SCROLL_BREAK_POINT = 1024;
const SCROLL_TO_DURATION_IN_SECONDS = 1.5;

export default defineNuxtPlugin(({ $ScrollTrigger }) => {
  const scrollerEl = document.getElementById('__nuxt');

  const locomotiveScroll = new LocomotiveScroll({
    el: scrollerEl,
    smooth: true,
  });

  locomotiveScroll.on('scroll', $ScrollTrigger.update);

  $ScrollTrigger.scrollerProxy(locomotiveScroll.el, {
    scrollTop(value) {
      return arguments.length
        ? locomotiveScroll.scrollTo(value, { disableLerp: true, duration: 0 })
        : locomotiveScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: locomotiveScroll.el.style.transform ? 'transform' : 'fixed',
  });

  $ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());

  if (window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT)
    $ScrollTrigger.defaults({ scroller: locomotiveScroll.el });

  return {
    provide: { smoothScroll: makeLocomotiveScrollAdaptor(locomotiveScroll) },
  };
});

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
