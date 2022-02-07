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
    const { title, titleContentBlock } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      title,
      { yPercent: this.rangeOfMovement * -1 },
      {
        yPercent: this.rangeOfMovement,
        scrollTrigger: { scrub: true, trigger: title },
      }
    )

    gsap.fromTo(
      titleContentBlock,
      { scaleY: '100%' },
      {
        scaleY: '0%',
        duration: 0.75,
        scrollTrigger: {
          trigger: title.parentElement,
          once: true,
          start: 'top bottom-=20%',
        },
      }
    )
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

      background-color: var(--black-color);
      transform-origin: top center;
    }
  }
}
</style>
