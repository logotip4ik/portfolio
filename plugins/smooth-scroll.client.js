// import ASScroll from "@ashthornton/asscroll";
import LocomotiveScroll from 'locomotive-scroll';

const LOCOMOTIVE_SCROLL_BREAK_POINT = 1024;

export default defineNuxtPlugin(({ $ScrollTrigger }) => {
  const scrollerEl = document.getElementById('scroller');

  const locomotiveScroll = new LocomotiveScroll({
    el: scrollerEl,
    smooth: true,
  });

  locomotiveScroll.on('scroll', $ScrollTrigger.update);

  $ScrollTrigger.scrollerProxy(locomotiveScroll.el, {
    scrollTop(value) {
      return arguments.length
        ? locomotiveScroll.scrollTo(value, 0, 0)
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
  let scrollY = 0;

  locomotiveScroll.on('scroll', ({ scroll }) => (scrollY = scroll.y));

  return {
    scrollY: () =>
      window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT
        ? scrollY
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
  };
}

/** @param {import('@ashthornton/asscroll').default} asscroll */
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
