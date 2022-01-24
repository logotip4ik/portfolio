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
    const opacityRangeMapper = gsap.utils.mapRange(0, scrollDownCircles.length, 1, 0.25)
    const circlesTl = gsap.timeline({
      defaults: { duration: 1.75, ease: 'power2.inOut' },
      repeat: -1,
    })

    circlesTl.fromTo(
      scrollDownCircles,
      { opacity: 0 },
      { opacity: (key) => opacityRangeMapper(key) }
    )

    scrollDownCircles.forEach((circle, key) => {
      const yOffsetCssVarName = `--y-offset-${key + 1}`
      const skewCssVarName = `--skew-${key + 1}`

      circlesTl.fromTo(
        circle,
        { [yOffsetCssVarName]: '3rem', [skewCssVarName]: '7deg' },
        { [yOffsetCssVarName]: '0.75rem', [skewCssVarName]: '0deg' },
        `${0.125 + 0.075 * key}`
      )
    })

    circlesTl.to(scrollDownCircles, { opacity: 0, duration: 0.75 }, '-=0.25')
  },
}
</script>

<style lang="scss">
.scroll-down {
  --ff-size: calc(var(--step--1) - 0.2vw);

  font-size: var(--ff-size);
  margin: 0;
  padding-bottom: 2rem;

  writing-mode: vertical-lr;
  cursor: pointer;

  transform: translateY(-25%);

  &__text {
    letter-spacing: 0.5px;
    padding-inline-end: 2rem;

    opacity: 0.85;
  }

  &__circle {
    $circles-number: 3;

    @for $i from 0 to $circles-number {
      --y-offset-#{$i + 1}: 0.5rem;
      --skew-#{$i + 1}: 0deg;
    }

    --size: var(--ff-size);
    --min-size: 12px;

    position: absolute;
    left: 0;

    @for $i from 0 to $circles-number {
      &:nth-child(#{$i + 3}) {
        bottom: calc(100% + var(--y-offset-#{$i + 1}));
        transform: skewY(var(--skew-#{$i + 1}));
      }
    }

    height: var(--size);
    width: var(--size);
    min-height: var(--min-size);
    min-width: var(--min-size);

    box-shadow: 0 0 2px 0 rgba($color: #fff, $alpha: 1);
    border-radius: 50%;
    background: transparent;
  }
}
</style>
