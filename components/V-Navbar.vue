<template>
  <nav
    class="nav"
    @mouseenter="showBackground"
    @touchstart="showBackground"
    @mouseleave="hideBackground"
    @touchend="hideBackground"
  >
    <p ref="navTitle" class="nav__title serif">BK</p>

    <ul class="nav__navigation">
      <li
        v-for="(item, key) in links"
        :key="key"
        ref="navNavigationItems"
        class="nav__navigation__item"
        @mouseenter="showHoverAnimation(key)"
        @mouseleave="hideHoverAnimation(key)"
        @touchstart="showHoverAnimation(key)"
        @touchend="hideHoverAnimation(key)"
      >
        <span>{{ item.label }}</span>
        <span class="serif">{{ item.label }}</span>
      </li>
    </ul>

    <div ref="navBackground" class="nav__background"></div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    links: [{ label: 'Work' }, { label: 'About' }, { label: 'Contact' }],
  }),
  mounted() {
    const { navTitle } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      navTitle,
      { opacity: 0 },
      {
        opacity: 1,
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
    showHoverAnimation(key) {
      this.$gsap.fromTo(
        this.$refs.navNavigationItems[key].children[1],
        { yPercent: -10 },
        { yPercent: -100, duration: 0.25 }
      )
      this.$gsap.to(this.$refs.navNavigationItems[key].children[0], {
        yPercent: -100,
        duration: 0.25,
      })
    },
    hideHoverAnimation(key) {
      this.$gsap.to(this.$refs.navNavigationItems[key].children[1], {
        yPercent: -10,
        duration: 0.25,
      })
      this.$gsap.to(this.$refs.navNavigationItems[key].children[0], {
        yPercent: 0,
        duration: 0.25,
      })
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
  }

  &__navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--step-2);

    font-size: var(--step--1);

    padding-block: 2.5rem;
    padding-inline-end: clamp(1rem, 10vw, 7rem);

    pointer-events: all;
    list-style-type: none;

    &__item {
      position: relative;

      letter-spacing: 0.25px;

      margin: 0;

      cursor: pointer;
      mix-blend-mode: difference;
      overflow: hidden;

      span {
        display: inline-block;

        &:nth-child(2) {
          position: absolute;
          left: 0;
          top: 100%;

          letter-spacing: 0.5px;
        }
      }
    }
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
