<template>
  <h2 ref="title" class="title-h2 serif"><slot></slot></h2>
</template>

<script>
export default {
  props: {
    yOffset: {
      type: Object,
      required: false,
      default: () => ({ start: 0, end: 0 }),
    },
  },
  computed: {
    defaultedYOffset() {
      return {
        start: 0,
        end: 0,
        ...this.yOffset,
      }
    },
  },
  mounted() {
    const { title } = this.$refs

    const gsap = this.$gsap

    // BUG: start offset is breaking everything, idk why
    const startString =
      this.defaultedYOffset.start !== 0
        ? `top+=${this.defaultedYOffset.start}% bottom`
        : 'top bottom'
    const endString =
      this.defaultedYOffset.end !== 0
        ? `+=${50 + this.defaultedYOffset.end}% top`
        : '+=50% top'

    gsap.fromTo(
      title,
      { yPercent: 50 },
      {
        yPercent: -50,
        scrollTrigger: {
          scrub: 0.75,
          trigger: title.parentElement,
          start: startString,
          end: endString,
        },
      }
    )
  },
}
</script>

<style>
.title-h2 {
  text-align: center;
}
</style>
