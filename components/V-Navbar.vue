<template>
  <nav
    ref="nav"
    class="nav container"
    role="navigation"
    aria-label="main navigation"
  >
    <button
      ref="navTitle"
      class="nav__title serif"
      tabindex="0"
      aria-label="to top"
      @click="$scrollTo(0), $nuxt.$emit('toggle-menu', false)"
    >
      <span aria-hidden="true">BK</span>
    </button>

    <!-- FIXME: tabindex, how to make it work correctly? -->
    <button
      ref="navMenuButton"
      tabindex="0"
      aria-label="menu button"
      class="nav__menu-button"
      @click="toggleMenu"
      @keypress.space.stop
      @pointerenter="hoverAnimation"
      @pointerleave="idleAnimation"
    >
      <MenuIconSVG ref="navMenuButtonSVG" aria-hidden="true"></MenuIconSVG>
    </button>
  </nav>
</template>

<script>
import MenuIconSVG from '~/assets/img/menu-icon.svg?inline'

export default {
  components: { MenuIconSVG },
  data: () => ({ isNavbarWhite: false }),
  mounted() {
    const { navTitle } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      navTitle,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: '.header',
          start: `60% top+=60px`,
          end: `bottom top+=60px`,
          scrub: true,
        },
      }
    )

    this.$nuxt.$on('toggle-menu', (bool) =>
      typeof bool === 'boolean'
        ? (this.isNavbarWhite = bool)
        : (this.isNavbarWhite = !this.isNavbarWhite)
    )
  },
  methods: {
    toggleMenu() {
      this.$nuxt.$emit('toggle-menu')

      document.querySelector('.menu').focus()
    },
    idleAnimation() {
      const lines = this.$refs.navMenuButtonSVG.children

      this.$gsap.to(lines[0], { attr: { x1: 0.5 }, ease: 'back.out' })
      this.$gsap.to(lines[1], { attr: { x1: 5.5 }, ease: 'back.out' })
    },
    hoverAnimation() {
      const lines = this.$refs.navMenuButtonSVG.children

      this.$gsap.to(lines, { attr: { x1: 4.5 }, ease: 'back.out' })
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
  top: 1rem;
  left: 0;

  padding: 0 var(--x-padding);
  width: 100%;
  pointer-events: none;

  color: darken($color: white, $amount: 27);

  transition: color 200ms ease;

  &__title {
    color: currentColor;
    font-size: var(--step-2);

    margin: 0;
    padding: 1.75rem 0;
    border: none;
    background-color: transparent;

    pointer-events: all;
    cursor: pointer;
  }

  &__menu-button {
    width: max(var(--step-5), 3.75rem);
    height: auto;

    padding: 0.75rem 0;
    margin: 0 var(--step--1);
    color: currentColor;
    border: none;
    background: transparent;

    cursor: pointer;
    pointer-events: all;

    transition: transform 300ms var(--ease-back);
    transform-origin: right center;

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
