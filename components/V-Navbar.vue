<template>
  <nav
    class="nav"
    @pointerenter="showBackground"
    @pointermove="showBackground"
    @pointerleave="hideBackground"
  >
    <p ref="navTitle" class="nav__title serif" @click="$scrollTo(0)">BK</p>

    <ul class="nav__navigation">
      <V-Navbar-Item
        v-for="(item, key) in links"
        :key="key"
        @click.native="item.action"
      >
        {{ item.label }}
      </V-Navbar-Item>
    </ul>

    <div ref="navBackground" class="nav__background"></div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { label: 'Work', action: () => this.$scrollTo('.works') },
        { label: 'About', action: () => this.$scrollTo('.about') },
        { label: 'Contact', action: () => null },
      ],
    }
  },
  mounted() {
    const { navTitle } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      navTitle,
      { opacity: 0, pointerEvents: 'none' },
      {
        opacity: 1,
        pointerEvents: 'all',
        scrollTrigger: {
          trigger: '.header',
          start: 'top+=25% top',
          end: 'bottom top',
          scrub: 0.75,
        },
      }
    )
  },
  methods: {
    showBackground() {
      // NOTE: scrollY is coming from smooth scroll plugin
      if (this.$scrollY() < window.innerHeight - 100) return
      this.$gsap.to(this.$refs.navBackground, { bottom: '0%' })
    },
    hideBackground() {
      this.$gsap.to(this.$refs.navBackground, { bottom: '100%' })
    },
  },
}
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;

  pointer-events: none;
  color: #dfdfdf;

  &__title {
    font-size: var(--step-2);
    opacity: 0;

    margin: 0;
    padding-block: 1.75rem;
    padding-inline-start: clamp(1rem, 10vw, 7rem);
    pointer-events: all;
    cursor: pointer;
  }

  &__navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-size: var(--step--1);

    padding-inline-end: clamp(1rem, 10vw, 7rem);

    pointer-events: all;
    list-style-type: none;
  }

  &__background {
    position: absolute;
    top: 0;
    bottom: 100%;
    left: 0;
    z-index: -1;

    width: 100%;

    background-color: #0e0d0d;
    pointer-events: all;
  }
}
</style>
