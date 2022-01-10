import ASScroll from '@ashthornton/asscroll'

export default ({ $gsap, $ScrollTrigger }, inject) => {
  const isMobile = 'ontouchstart' in document

  if (isMobile) return

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

  window.addEventListener('DOMContentLoaded', () => asscroll.enable())
}
