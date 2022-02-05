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

    <ul class="nav__sections" :style="{ '--sections-length': sections.length }">
      <li
        v-for="(section, key) in sections"
        :key="key"
        :class="{
          nav__sections__section: true,
          'nav__sections__section--active': activeSection === key,
        }"
        @click="activeSection = key"
      >
        {{ section.label }}
      </li>
    </ul>

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
  data: () => ({
    isMenuActive: false,
    activeSection: 1,
    sections: [
      { label: 'Home', scrollTo: '0' },
      { label: 'Work', scrollTo: '.work' },
      { label: 'About', scrollTo: '.about' },
      { label: 'Contact', scrollTo: '.contact' },
    ],
  }),
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

    cursor: pointer;
    pointer-events: all;
  }

  &__sections {
    display: grid;
    grid-template-rows: repeat(var(--sections-length), 1fr);
    gap: 0.25rem;

    padding: 0;
    list-style-type: none;

    &__section {
      position: relative;
      text-align: right;

      cursor: pointer;
      pointer-events: all;

      &::after {
        --size: calc(var(--step--1) - 0.75rem);
        content: '';

        position: absolute;
        right: 100%;
        top: 50%;
        width: var(--size);
        height: var(--size);

        opacity: 0;
        border-radius: 50%;
        background-color: #ffe6ed;

        transform: translate(-100%, -50%);
        transition: opacity 300ms, transform 300ms;
        transition-delay: 50ms;
      }

      &:is(:hover, :focus)::after {
        opacity: 0.75;
        transform: translate(-50%, -50%);
      }
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  &__menu-button {
    width: max(var(--step-5), 4rem);
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

    @media screen and (min-width: 768px) {
      display: none;
    }
  }
}
</style>
