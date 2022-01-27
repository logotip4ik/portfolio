<template>
  <div class="scroll-down">
    <div class="sr-only">scroll down to see more content</div>
    <div class="scroll-down__text" aria-hidden="true">
      <!-- NOTE: this only works without if text does not contain spaces -->
      <span
        v-for="(char, key) in scrollText"
        :key="key"
        ref="scrollDownTextChars"
        >{{ char }}</span
      >
    </div>
    <div
      v-for="key in 3"
      :key="key"
      ref="scrollDownCircles"
      class="scroll-down__circle"
      aria-hidden="true"
    ></div>
  </div>
</template>

<script>
export default {
  data: () => ({ scrollText: 'Scroll' }),
  mounted() {
    const { scrollDownCircles } = this.$refs

    const gsap = this.$gsap

    // prettier-ignore
    const opacityRangeMapper = gsap.utils.mapRange(0, scrollDownCircles.length, 0.75, 0.25)
    const circlesTl = gsap.timeline({
      defaults: { duration: 1.75, ease: 'power2.inOut' },
      repeat: -1,
    })

    circlesTl.fromTo(
      scrollDownCircles,
      { opacity: 0 },
      { opacity: (key) => opacityRangeMapper(key) }
    )

    circlesTl.fromTo(
      scrollDownCircles,
      { bottom: '10%' },
      { bottom: '125%', duration: 2.5, stagger: 0.15 },
      '<+0.5'
    )

    circlesTl.to(scrollDownCircles, { opacity: 0, duration: 0.75 }, '-=0.45')
  },
}
</script>

<style lang="scss">
.scroll-down {
  --base-font-size: calc(var(--step--1) - 0.075rem);

  margin: 0;

  cursor: pointer;

  &__text {
    // NOTE: font size same as in clock
    font-size: calc(var(--base-font-size) + 0.13rem);
    font-weight: 200;
    letter-spacing: 0.5px;

    padding-inline-end: calc(var(--base-font-size) + 0.5rem);
  }

  &__circle {
    --size: var(--base-font-size);
    --min-size: 15px;

    position: absolute;
    right: 0;
    bottom: 10%;

    height: var(--size);
    width: var(--size);
    min-height: var(--min-size);
    min-width: var(--min-size);

    box-shadow: 0 0 1px 1px rgba($color: #fff, $alpha: 1);
    border-radius: 50%;
    background: transparent;
  }
}
</style>
