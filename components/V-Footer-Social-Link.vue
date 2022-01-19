<template>
  <a
    :href="href"
    rel="noopener noreferrer"
    class="social-link"
    @focus="showHoverText"
    @blur="hideHoverText"
    @pointerenter="showHoverText"
    @pointerleave="hideHoverText"
  >
    <div class="social-link__wrapper" aria-hidden="true">
      <span class="social-link__line serif">
        <span v-for="(char, key) in linkText" :key="key" ref="hoverChars">{{
          char
        }}</span>
      </span>
      <span class="social-link__line">
        <span v-for="(char, key) in linkText" :key="key" ref="idleChars">{{
          char
        }}</span>
      </span>
    </div>
    <span class="sr-only">{{ linkText }}</span>
  </a>
</template>

<script>
export default {
  props: {
    href: { type: String, required: true, default: 'https://example.com' },
  },
  computed: {
    linkText() {
      return this.$slots.default[0].text.trim()
    },
  },
  methods: {
    /**
     * @param {Object} props Additional gsap timeline props
     */
    timelineFactory(props) {
      return this.$gsap.timeline({
        defaults: { stagger: 0.05, duration: 0.2 },
        ...props,
      })
    },
    showHoverText() {
      if (this.prevTl) this.prevTl.kill()

      const tl = this.timelineFactory()

      tl.to(this.$refs.idleChars, { yPercent: -100 })
      tl.to(this.$refs.hoverChars, { yPercent: -100 }, '<')

      this.prevTl = tl
    },
    hideHoverText() {
      if (this.prevTl) this.prevTl.kill()

      const tl = this.timelineFactory()

      tl.to(this.$refs.idleChars, { yPercent: 0 })
      tl.to(this.$refs.hoverChars, { yPercent: 0 }, '<')

      this.prevTl = tl
    },
  },
}
</script>

<style lang="scss">
.social-link {
  display: inline-block;

  margin: 0;

  cursor: pointer;

  &__wrapper {
    position: relative;

    line-height: 1;
    overflow: hidden;
  }

  &__line {
    letter-spacing: 0.25px;
    cursor: pointer;

    margin: 0;
    padding: 0;
    white-space: nowrap;

    &:nth-child(1) {
      font-size: calc(var(--step-0) - 0.125rem);

      transform: translateY(100%);
    }

    &:nth-child(2) {
      position: absolute;
      top: 0;
      right: 0;

      font-size: calc(var(--step--1) - 0.0125rem);

      @media screen and (max-width: 600px) {
        font-size: calc(var(--step--1) - 0.05rem);

        right: 50%;
        transform: translateX(50%);
      }
    }
  }

  span {
    display: inline-block;
  }
}
</style>
