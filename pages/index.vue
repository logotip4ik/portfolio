<template>
  <LocoScroll
    ref="scroller"
    :getted-options="{
      direction: 'vertical',
      smartphone: {
        direction: 'vertical',
      },
      tablet: {
        direction: 'vertical',
      },
    }"
    @init="locomotive = $refs.scroller.locomotive"
  >
    <SectionHeader data-scroll-section />
    <main>
      <SectionProjects data-scroll-section />
      <SectionAbout data-scroll-section />
    </main>
  </LocoScroll>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    locomotive: null,
  }),
  watch: {
    locomotive: {
      handler() {
        this.locomotive.on('scroll', this.$ScrollTrigger.update)

        const locomotive = this.locomotive

        this.$ScrollTrigger.scrollerProxy(locomotive.el, {
          scrollTop(value) {
            return arguments.length
              ? locomotive.scrollTo(value, 0, 0)
              : locomotive.scroll.instance.scroll.y
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          },
          pinType: document.querySelector('.js-locomotive').style.transform
            ? 'transform'
            : 'fixed',
        })
      },
    },
  },
  mounted() {
    const blobs = document.querySelectorAll('.parallax-blob')
    const gsap = this.$gsap

    console.log(this.$refs.scroller.locomotive.el)

    gsap.to(blobs, {
      y: (i) => gsap.utils.random(-300, -100) * (i + 1),
      invalidateOnRefresh: true,
      scrollTrigger: {
        scrub: 2,
        scroller: this.$refs.scroller.locomotive.el,
        start: 'top top',
        end: 'bottom top',
      },
    })
  },
}
</script>

<style lang="scss"></style>
