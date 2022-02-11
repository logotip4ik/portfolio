import LocomotiveScroll from 'locomotive-scroll'

const SCROLL_TO_DURATION_IN_SECONDS = 1.5
const LOCOMOTIVE_SCROLL_BREAK_POINT = 1024

export default ({ $gsap, $ScrollTrigger }, inject) => {
  inject('smoothScrollBreakPoint', LOCOMOTIVE_SCROLL_BREAK_POINT)

  const el = document.querySelector('.scroller')

  const locomotiveScroll = new LocomotiveScroll({ el, smooth: true })

  locomotiveScroll.on('scroll', $ScrollTrigger.update)

  $ScrollTrigger.scrollerProxy(locomotiveScroll.el, {
    scrollTop(value) {
      return arguments.length
        ? locomotiveScroll.scrollTo(value, 0, 0)
        : locomotiveScroll.scroll.instance.scroll.y
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it
    // doesn't even transform the container at all! So to get the correct behavior
    // and avoid jitters, we should pin things with position: fixed on mobile. We
    // sense it by checking to see if there's a transform applied to the container
    // (the LocomotiveScroll-controlled element).
    pinType: locomotiveScroll.el.style.transform ? 'transform' : 'fixed',
  })

  if (window.innerWidth >= LOCOMOTIVE_SCROLL_BREAK_POINT)
    $ScrollTrigger.defaults({ scroller: locomotiveScroll.el })

  let scrollY = 0

  locomotiveScroll.on('scroll', ({ scroll }) => (scrollY = scroll.y))

  inject('locomotiveScroll', locomotiveScroll)

  inject('scrollY', () =>
    window.innerWidth < LOCOMOTIVE_SCROLL_BREAK_POINT ? window.scrollY : scrollY
  )
  inject('disableScrollY', () => {
    if (window.innerWidth < LOCOMOTIVE_SCROLL_BREAK_POINT)
      $gsap.set(document.body, { overflowY: 'hidden' })
    else locomotiveScroll.stop()
  })
  inject('enableScrollY', () => {
    if (window.innerWidth < LOCOMOTIVE_SCROLL_BREAK_POINT)
      $gsap.set(document.body, { overflowY: 'auto' })
    else locomotiveScroll.start()
  })
  inject('scrollTo', (selector) => {
    if (window.innerWidth < LOCOMOTIVE_SCROLL_BREAK_POINT)
      $gsap.to(window, {
        scrollTo: { y: selector, autoKill: true },
        duration: SCROLL_TO_DURATION_IN_SECONDS,
        ease: 'power3.inOut',
      })
    else
      locomotiveScroll.scrollTo(selector, {
        // NOTE: Locomotive scroll needs milliseconds
        duration: SCROLL_TO_DURATION_IN_SECONDS * 1000,
        easing: [0.645, 0.045, 0.355, 1.0],
      })
  })
}
