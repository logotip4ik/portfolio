<template>
  <h2 ref="title" class="title-h2 serif">
    <span class="sr-only">{{ defaultSlotText }}</span>
    <div class="title-h2__content" aria-hidden="true">
      <slot></slot>
      <div ref="titleContentBlock" class="title-h2__content__block"></div>
    </div>
  </h2>
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
    defaultSlotText() {
      return this.$slots.default[0].text
    },
  },
  mounted() {
    const { title, titleContentBlock } = this.$refs

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

    gsap.to(titleContentBlock, {
      bottom: '100%',
      duration: 0.75,
      scrollTrigger: {
        trigger: title.parentElement,
        once: true,
        start: 'top bottom-=13%',
      },
    })
  },
}
</script>

<style lang="scss">
.title-h2 {
  text-align: center;

  &__content {
    display: inline-block;

    position: relative;

    &__block {
      position: absolute;
      top: 0;
      left: -5px;
      right: -5px;
      bottom: 0%;

      background-color: white;
    }
  }
}
</style>
