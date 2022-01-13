<template>
  <li
    class="navbar-item"
    tabindex="0"
    @click="$emit('click', $event)"
    @keypress.enter="$emit('click', $event)"
    @pointerenter="showHoverText"
    @pointerleave="hideHoverText"
  >
    <div class="navbar-item__wrapper">
      <!-- First span will be for hover state and parent width will be determined by first span -->
      <span class="navbar-item__line serif">
        <span v-for="(char, key) in itemChars" :key="key" ref="hoverChars">{{
          char
        }}</span>
      </span>
      <span class="navbar-item__line">
        <span v-for="(char, key) in itemChars" :key="key" ref="idleChars">{{
          char
        }}</span>
      </span>
    </div>
  </li>
</template>

<script>
export default {
  data: () => ({ prevTl: null }),
  computed: {
    itemChars() {
      const text = this.$slots.default[0].text.trim()
      return text.split('')
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
.navbar-item {
  margin: 0;
  padding-block: 2.25rem;
  padding-inline: calc(var(--step-0));

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
      left: 0;

      font-size: calc(var(--step--1) - 0.0125rem);

      @media screen and (max-width: 600px) {
        font-size: calc(var(--step--1) - 0.05rem);
      }
    }
  }

  span {
    display: inline-block;
  }
}
</style>
