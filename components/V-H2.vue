<template>
  <h2 ref="title" class="title-h2 serif">
    <span class="sr-only">{{ defaultSlotText }}</span>
    <div ref="titleContent" class="title-h2__content" aria-hidden="true">
      <slot></slot>
    </div>
  </h2>
</template>

<script>
export default {
  props: {
    rangeOfMovement: { type: Number, required: false, default: 25 },
  },
  computed: {
    defaultedYOffset() {
      return {
        start: 0,
        end: 0,
        ...this.yOffset,
      }
    },
    defaultSlotText() {
      return this.$slots.default[0].text
    },
  },
  mounted() {
    const { title, titleContent } = this.$refs

    const gsap = this.$gsap

    // Parallax animation
    gsap.fromTo(
      title,
      { yPercent: this.rangeOfMovement * -1 },
      {
        yPercent: this.rangeOfMovement,
        scrollTrigger: { scrub: true, trigger: title },
      }
    )

    // Reveal animation
    gsap.fromTo(
      titleContent,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.75,
        ease: 'power2.out(1.5)',
        scrollTrigger: {
          trigger: title,
          start: 'top bottom-=20%',
          once: true,
        },
      }
    )
  },
}
</script>

<style lang="scss">
.title-h2 {
  text-align: center;
  overflow: hidden;
}
</style>
