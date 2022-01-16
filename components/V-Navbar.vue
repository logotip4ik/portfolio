<template>
  <nav :class="{ nav: true, 'nav--white': isNavbarWhite }">
    <p
      ref="navTitle"
      class="nav__title serif"
      tabindex="-1"
      @click="$scrollTo(0)"
      @keypress.enter="$scrollTo(0)"
    >
      BK
    </p>

    <!-- FIXME: tabindex, how to make it work correctly? -->
    <button
      ref="navMenuButton"
      tabindex="-1"
      class="nav__menu-button"
      @click="toggleMenu"
      @pointerenter="hoverAnimation"
      @pointerleave="idleAnimation"
    >
      <MenuIconSVG ref="navMenuButtonSVG"></MenuIconSVG>
    </button>
  </nav>
</template>

<script>
import MenuIconSVG from '~/assets/img/menu-icon.svg?inline'

export default {
  components: { MenuIconSVG },
  data: () => ({ isNavbarWhite: false }),
  mounted() {
    const { navTitle, navMenuButton } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      navTitle,
      { opacity: 0, pointerEvents: 'none' },
      {
        opacity: 1,
        pointerEvents: 'all',
        scrollTrigger: {
          trigger: '.header',
          start: 'top+=50% top',
          end: 'bottom top',
          scrub: 0.25,
          onEnter: () => navTitle.setAttribute('tabindex', 1),
          onLeaveBack: () => navTitle.setAttribute('tabindex', -1),
        },
      }
    )
    gsap.fromTo(
      navMenuButton,
      { opacity: 0, pointerEvents: 'none' },
      {
        opacity: 1,
        pointerEvents: 'all',
        scrollTrigger: {
          trigger: '.header',
          start: 'top+=60% top',
          end: 'bottom+=10% top',
          scrub: 0.25,
          onEnter: () => navMenuButton.setAttribute('tabindex', 2),
          onLeaveBack: () => navMenuButton.setAttribute('tabindex', -1),
        },
      }
    )

    this.$nuxt.$on(
      'toggle-menu',
      () => (this.isNavbarWhite = !this.isNavbarWhite)
    )
  },
  methods: {
    toggleMenu() {
      this.$nuxt.$emit('toggle-menu')
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
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;

  padding: 1rem clamp(1rem, 4vw, 5rem);
  pointer-events: none;
  color: #303030;

  transition: color 200ms ease;

  &--white {
    color: white;
    transition-duration: 1000ms;
  }

  &__title {
    font-size: var(--step-2);

    margin: 0;
    padding-block: 1.75rem;
    padding-inline: var(--step-0);
    pointer-events: none;
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
    pointer-events: none;

    transition: transform 300ms var(--ease-back);
    transform-origin: right center;

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
