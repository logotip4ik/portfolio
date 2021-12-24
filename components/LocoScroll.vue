<template>
  <div class="smooth-scroll">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LocomotiveScroll',
  props: {
    gettedOptions: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    locomotive: undefined,
    defaultOptions: {
      smooth: true,
      direction: 'vertical',
    },
  }),
  computed: {
    options() {
      return { ...this.defaultOptions, ...this.gettedOptions }
    },
  },
  beforeMount() {
    const locoScroll = new this.LocomotiveScroll({
      el: document.querySelector('.smooth-scroll'),
      smooth: true,
      direction: 'vertical',
    })

    locoScroll.on('scroll', this.$ScrollTrigger.update)

    this.$ScrollTrigger.defaults({
      scroller: locoScroll.el,
    })

    this.$ScrollTrigger.scrollerProxy(locoScroll.el, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: locoScroll.el.style.transform ? 'transform' : 'fixed',
    })

    this.$ScrollTrigger.addEventListener('refresh', () => locoScroll.update())
    this.$nextTick(() => this.$ScrollTrigger.refresh())

    this.locomotive = locoScroll
  },
  mounted() {
    this.$nuxt.$on('update-locomotive', () => {
      this?.locomotive?.update()
    })
  },
}
</script>

<style></style>
