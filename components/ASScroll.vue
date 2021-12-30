<template>
  <div asscroll-container class="scroller">
    <slot asscroll />
  </div>
</template>

<script>
export default {
  data: () => ({
    asscroll: null,
  }),
  beforeMount() {
    this.initSmoothScroll()
  },
  beforeUpdate() {
    this.$gsap.ticker.remove(this.asscroll.update)
  },
  methods: {
    initSmoothScroll() {
      const ASScroll = this.ASScroll

      const asscroll = new ASScroll({
        disableRaf: true,
        ease: 0.065,
      })

      this.$gsap.ticker.add(asscroll.update)

      this.$ScrollTrigger.defaults({
        scroller: asscroll.containerElement,
      })

      this.$ScrollTrigger.scrollerProxy(asscroll.containerElement, {
        scrollTop(value) {
          if (arguments.length) {
            asscroll.currentPos = value
            return
          }
          return asscroll.currentPos
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
        fixedMarkers: true,
      })

      asscroll.on('update', this.$ScrollTrigger.update)
      this.$ScrollTrigger.addEventListener('refresh', asscroll.resize)

      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          '.gsap-marker-start, .gsap-marker-end, [asscroll]'
        ),
      })

      this.$nextTick(() => asscroll.update())

      this.$nuxt.$asScroll = asscroll

      this.asscroll = asscroll
    },
  },
}
</script>

<style></style>
