<template>
  <nav
    ref="nav"
    :class="{ nav: true, 'nav--white': isNavbarWhite }"
    role="navigation"
    aria-label="main navigation"
  >
    <!-- TODO: check if menu is open, berofe emiting the toggle-menu, cuz it will cause to open the
    menu is it closen -->
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
    const { nav } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      nav,
      { display: 'none', opacity: 0 },
      {
        display: 'flex',
        opacity: 1,
        scrollTrigger: {
          trigger: '.header',
          start: 'top+=50% top',
          end: 'bottom top',
          scrub: 0.25,
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
  --x-padding: clamp(1rem, 4vw, 5rem);

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 1rem;
  left: 0;

  padding: 0 var(--x-padding);
  width: 100%;
  max-width: 100vw;
  pointer-events: none;

  color: #303030;

  transition: color 200ms ease;

  &--white {
    color: white;
    transition-duration: 1000ms;
  }

  &__title {
    color: currentColor;
    font-size: var(--step-2);

    margin: 0;
    padding-block: 1.75rem;
    padding-inline: var(--step-0);
    border: none;
    background-color: transparent;

    pointer-events: all;
    cursor: pointer;
  }

  &__menu-button {
    width: var(--step-5);
    height: var(--step-5);

    margin-inline: var(--step-0);
    color: inherit;
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
