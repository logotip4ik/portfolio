import ASScroll from '@ashthornton/asscroll'

export default ({ $gsap, $ScrollTrigger }, inject) => {
  const isMobile = 'ontouchstart' in document

  if (isMobile) {
    inject('scrollY', () => window.scrollY)
    inject('disableScrollY', () => {})
    inject('enableScrollY', () => {})
    inject('scrollTo', (selector) =>
      $gsap.to(window, {
        scrollTo: selector,
        ease: 'power2.inOut',
        duration: 1,
      })
    )
    return
  }

  const el = document.querySelector('.scroller')

  const asscroll = new ASScroll({
    disableRaf: true,
    containerElement: el,
  })

  $gsap.ticker.add(asscroll.update)

  $ScrollTrigger.defaults({
    scroller: asscroll.containerElement,
  })

  $ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    scrollTop(value) {
      return arguments.length
        ? (asscroll.currentPos = value)
        : asscroll.currentPos
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  asscroll.on('update', $ScrollTrigger.update)
  $ScrollTrigger.addEventListener('refresh', asscroll.resize)

  inject('asscroll', asscroll)
  inject('scrollY', () => asscroll.currentPos)
  inject('disableScrollY', () => asscroll.disable())
  inject('enableScrollY', () => asscroll.enable())
  inject('scrollTo', (selector) => {
    if (typeof selector === 'number')
      return $gsap.to(asscroll, {
        currentPos: selector,
        ease: 'power2.inOut',
        duration: 1,
      })

    const el = document.querySelector(selector)
    $gsap.to(asscroll, {
      currentPos: el.offsetTop,
      ease: 'power2.inOut',
      duration: 1,
    })
  })
}
