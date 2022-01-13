<template>
  <nav
    class="nav"
    @pointerenter="showBackground"
    @pointerleave="hideBackground"
  >
    <p
      ref="navTitle"
      class="nav__title serif"
      tabindex="0"
      @focus="showBackground"
      @blur="hideBackground"
      @click="$scrollTo(0), hideBackground()"
      @keypress.enter="$scrollTo(0), hideBackground()"
    >
      BK
    </p>

    <ul class="nav__navigation">
      <V-Navbar-Item
        v-for="(item, key) in links"
        :key="key"
        @click="item.action"
        @focus.native="showBackground"
        @blur.native="hideBackground"
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
      backgroundTimeline: {},
    }
  },
  mounted() {
    const { navTitle, navBackground } = this.$refs

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
          onEnter: () => navTitle.setAttribute('tabindex', 0),
          onLeaveBack: () => navTitle.setAttribute('tabindex', -1),
        },
      }
    )

    this.backgroundTimeline = this.$gsap
      .timeline({ paused: true })
      .to(navBackground, { bottom: '0%', ease: 'power1.inOut' })
  },
  methods: {
    showBackground() {
      // NOTE: scrollY is coming from smooth scroll plugin
      if (this.$scrollY() < window.innerHeight - 100) return

      this.backgroundTimeline.play()
    },
    hideBackground() {
      this.backgroundTimeline.reverse()
    },
  },
}
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;

  padding-inline: clamp(1rem, 4vw, 5rem);
  pointer-events: none;
  color: #dfdfdf;

  &__title {
    font-size: var(--step-2);
    opacity: 0;

    margin: 0;
    padding-block: 1.75rem;
    padding-inline: var(--step-0);
    pointer-events: all;
    cursor: pointer;
  }

  &__navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    font-size: var(--step--1);

    pointer-events: all;
    list-style-type: none;
    padding-inline: 0;
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
