import LocomotiveScroll from 'locomotive-scroll'

export default ({ $gsap, $ScrollTrigger }, inject) => {
  const el = document.querySelector('.scroller')

  const locoScroll = new LocomotiveScroll({
    el,
    smooth: true,
    reloadOnContextChange: true,
  })

  locoScroll.on('scroll', $ScrollTrigger.update)

  $ScrollTrigger.scrollerProxy(locoScroll.el, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: locoScroll.el.style.transform ? 'transform' : 'fixed',
  })

  $ScrollTrigger.defaults({ scroller: locoScroll.el })

  let scrollY = 0

  locoScroll.on('scroll', ({ scroll }) => (scrollY = scroll.y))

  inject('scrollY', () => scrollY)
  inject('disableScrollY', () => {
    if (window.innerWidth > 999) return locoScroll.stop()

    $gsap.set(document.body, { overflowY: 'hidden' })
  })
  inject('enableScrollY', () => {
    if (window.innerWidth > 999) return locoScroll.start()

    $gsap.set(document.body, { overflowY: 'auto' })
  })
  inject('scrollTo', (selector) => {
    if (window.innerWidth < 1000)
      return $gsap.to(window, {
        scrollTo: {
          y: selector,
          autoKill: true,
          // offsetY: 50,
        },
        duration: 1,
        ease: 'power3.inOut',
      })

    locoScroll.scrollTo(selector, {
      duration: 1000,
      easing: [0.645, 0.045, 0.355, 1.0],
    })
  })
}
