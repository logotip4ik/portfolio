<template>
  <nav
    ref="nav"
    class="nav container"
    role="navigation"
    aria-label="main navigation"
    data-scroll-sticky
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

    <div ref="navSections" class="nav__sections">
      <div
        ref="navSectionsCircle"
        :class="{
          nav__sections__circle: true,
          'nav__sections__circle--hidden': !isShowingCurrentSection,
        }"
      ></div>
      <ul
        ref="navSectionsList"
        class="nav__sections__list"
        :style="{ '--sections-length': sections.length }"
      >
        <li
          v-for="(section, key) in sections"
          :key="key"
          ref="navSectionsListSections"
          role="button"
          tabindex="0"
          :class="{
            nav__sections__list__section: true,
            'nav__sections__list__section--active': key === currentSection,
            'nav__sections__list__section--non-active':
              key !== currentSection && isShowingCurrentSection,
          }"
          @click="$scrollTo(section.scrollTo)"
          @keypress.enter.space.prevent="$scrollTo(section.scrollTo)"
        >
          {{ section.label }}
        </li>
      </ul>
    </div>

    <!-- FIXME: tabindex, how to make it work correctly? -->
    <button
      ref="navMenuButton"
      tabindex="0"
      aria-label="menu button"
      class="nav__menu-button"
      @click="toggleMenu"
      @keypress.space.enter="toggleMenu"
      @pointerenter="hoverAnimation"
      @pointerleave="idleAnimation"
    >
      <MenuIconSVG ref="navMenuButtonSVG" aria-hidden="true"></MenuIconSVG>
    </button>
  </nav>
</template>

<script>
import MenuIconSVG from '~/assets/img/menu-icon.svg?inline'

const SVG_SIZE = 20
const SVG_LINES_PADDING = 5

const svgColorIdle = { light: '#030303', dark: '#bababa' }
const svgColorActive = { light: '#ffffff', dark: '#030303' }

export default {
  components: { MenuIconSVG },
  props: { currentSection: { type: Number, required: true, default: 0 } },
  data: () => ({
    prefersReducedMotion: false,
    isMenuActive: false,
    isShowingCurrentSection: false,
    sections: [
      { label: 'Home', scrollTo: 0 },
      { label: 'Work', scrollTo: '.works' },
      { label: 'About', scrollTo: '.about' },
      { label: 'Contact', scrollTo: '.contact' },
    ],
  }),
  watch: {
    currentSection(val) {
      if (this.prefersReducedMotion) return

      const { navSections, navSectionsListSections, navSectionsCircle } =
        this.$refs

      // NOTE: when desktop navigation is hidden
      // it doesn't have any width or height
      const sectionsHeight = navSections.clientHeight || 94

      const oneHeight = 1.5 + sectionsHeight / navSectionsListSections.length

      this.$gsap.to(navSectionsCircle, {
        '--top-offset': val * oneHeight,
        ease: 'back.out',
        duration: 0.3,
      })
    },
    isMenuActive(val) {
      if (val) this.closeAnimation()
      else this.idleAnimation()
    },
  },
  mounted() {
    this.prefersReducedMotion = this.$prefersReducedMotion()

    const { nav, navTitle } = this.$refs

    const gsap = this.$gsap
    const ScrollTrigger = this.$ScrollTrigger

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

    ScrollTrigger.create({
      trigger: 'header',
      start: 'top+=35% top+=80px',
      end: 'top+=35% top+=80px',
      onEnter: () => (this.isShowingCurrentSection = true),
      onLeaveBack: () => (this.isShowingCurrentSection = false),
    })

    let prevScrollPosition = 0
    this.$locomotiveScroll.on('scroll', ({ scroll }) => {
      if (scroll.y < window.innerHeight - window.innerHeight / 2)
        return gsap.to(nav, { autoAlpha: 1 })

      const scrollingDown = scroll.y - prevScrollPosition > 0
      prevScrollPosition = scroll.y

      if (scrollingDown) gsap.to(nav, { autoAlpha: 0 })
      else gsap.to(nav, { autoAlpha: 1, duration: 0.25 })
    })

    this.$nuxt.$on('toggle-menu', (bool) => {
      if (typeof bool === 'boolean') this.isMenuActive = bool
      else this.isMenuActive = !this.isMenuActive
    })

    this.$onColorSchemeChange((media) => {
      const isDarkMode = !media.matches
      const lines = this.$refs.navMenuButtonSVG.children

      this.$gsap.to(lines, {
        color: isDarkMode ? svgColorIdle.dark : svgColorIdle.light,
      })
    })
  },
  methods: {
    toggleMenu() {
      this.$nuxt.$emit('toggle-menu')
    },
    closeAnimation() {
      const isDarkMode = this.$isDarkMode()

      const lines = this.$refs.navMenuButtonSVG.children

      const tl = this.$gsap.timeline({ defaults: { ease: 'back.out' } })
      const { navMenuButton } = this.$refs

      const line0Attrs = {
        x1: SVG_SIZE - SVG_LINES_PADDING,
        y1: SVG_LINES_PADDING,
        x2: SVG_LINES_PADDING,
        y2: SVG_SIZE - SVG_LINES_PADDING,
      }
      const line1Attrs = {
        x1: SVG_LINES_PADDING,
        y1: SVG_LINES_PADDING,
        x2: SVG_SIZE - SVG_LINES_PADDING,
        y2: SVG_SIZE - SVG_LINES_PADDING,
      }

      if (this.prefersReducedMotion) {
        tl.to(lines, { opacity: 0 })
        tl.set(lines[0], { attr: line0Attrs })
        tl.set(lines[1], { attr: line1Attrs })
        tl.set(lines, {
          color: isDarkMode ? svgColorActive.dark : svgColorActive.light,
        })
        tl.set(navMenuButton, { '--bg-scale': '1' }, 0)
        tl.to(lines, { opacity: 1 })
      } else {
        tl.to(lines, {
          color: isDarkMode ? svgColorActive.dark : svgColorActive.light,
        })
        tl.to(lines[0], { attr: line0Attrs }, 0)
        tl.to(lines[1], { attr: line1Attrs }, '<')
        tl.to(navMenuButton, { '--bg-scale': '1' }, '0.135')
      }
    },
    idleAnimation() {
      if (this.isMenuActive) return

      const isDarkMode = this.$isDarkMode()

      const lines = this.$refs.navMenuButtonSVG.children
      const { navMenuButton } = this.$refs

      const tl = this.$gsap.timeline({ defaults: { ease: 'back.out' } })

      const line0Attrs = { x1: 0.25, y1: 7.75, x2: 19.75, y2: 7.75 }
      const line1Attrs = { x1: 5.25, y1: 11.75, x2: 19.75, y2: 11.75 }

      // NOTE: just reverting everything to default

      if (this.prefersReducedMotion) {
        tl.to(lines, { opacity: 0 })
        tl.set(lines[0], { attr: line0Attrs })
        tl.set(lines[1], { attr: line1Attrs })
        tl.set(lines, {
          color: isDarkMode ? svgColorIdle.dark : svgColorIdle.light,
        })
        tl.set(navMenuButton, { '--bg-scale': '0' })
        tl.to(lines, { opacity: 1 })
      } else {
        tl.to(lines, {
          color: isDarkMode ? svgColorIdle.dark : svgColorIdle.light,
        })
        tl.to(navMenuButton, { '--bg-scale': '0', ease: 'power2.out' }, 0)
        tl.to(lines[0], { attr: line0Attrs }, 0)
        tl.to(lines[1], { attr: line1Attrs }, '<')
      }
    },
    hoverAnimation() {
      if (this.isMenuActive || this.prefersReducedMotion) return

      const lines = this.$refs.navMenuButtonSVG.children

      // NOTE: just setting first x coordinate of two lines to padding
      this.$gsap.to(lines, {
        attr: { x1: SVG_LINES_PADDING },
        ease: 'back.out',
      })
    },
  },
}
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  position: fixed;
  top: 1rem;
  left: 0;
  z-index: 2;

  padding: 1rem var(--x-padding);
  width: 100%;
  pointer-events: none;

  color: darken($color: white, $amount: 27);

  transition: color 200ms ease;

  &__title {
    color: currentColor;
    font-size: var(--step-2);

    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;

    cursor: pointer;
    pointer-events: all;

    @media (prefers-color-scheme: light) {
      color: #030303;
    }
  }

  &__sections {
    position: relative;

    pointer-events: all;

    &__list {
      display: grid;
      grid-template-rows: repeat(var(--sections-length), 1fr);
      gap: 0.25rem;

      margin: 0;
      padding: 0;
      list-style-type: none;

      &__section {
        position: relative;

        font-size: var(--step--2);
        text-align: right;

        cursor: pointer;
        pointer-events: all;

        transition: color 100ms var(--ease-back);

        &::before {
          --size: calc(var(--step--2) - 0.6rem);
          content: none;

          position: absolute;
          top: 50%;
          right: 105%;

          width: var(--size);
          height: var(--size);

          border-radius: 50%;
          opacity: 0.75;
          background-color: #ffe6ed;

          transform: translate(-50%, -50%);

          opacity: 0;

          transition: opacity 100ms ease;

          @media (prefers-reduced-motion: reduce) {
            content: '';
          }

          @media (prefers-color-scheme: light) {
            background-color: #030303;
          }
        }

        &--non-active {
          color: darken($color: white, $amount: 60);
          transition: color 400ms var(--ease-back);
        }

        &--active::before {
          opacity: 1;
          transition: opacity 400ms ease;
        }

        &:is(:hover, :focus) {
          color: white;
          transition: none;
        }

        @media (prefers-color-scheme: light) {
          color: lighten($color: black, $amount: 40);

          &:is(:hover, :focus) {
            color: black;
            transition: none;
          }
        }
      }
    }

    &__circle {
      --top-offset: 1px;
      --size: calc(var(--step--2) - 0.6rem);

      position: absolute;
      top: var(--top-offset);
      right: 105%;

      width: var(--size);
      height: var(--size);

      border-radius: 50%;
      opacity: 0.75;
      background-color: #ffe6ed;

      transform: translate(-50%, 50%);
      transition: right 300ms var(--ease-back), opacity 300ms;

      &--hidden {
        opacity: 0;
        right: 110%;
      }

      @media (prefers-reduced-motion: reduce) {
        display: none;
      }

      @media (prefers-color-scheme: light) {
        background-color: #030303;
      }
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  &__menu-button {
    --bg-scale: 0;

    position: relative;
    z-index: 1;

    width: max(var(--step-5), 4rem);
    height: auto;

    padding: 0;
    margin: 0;
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

    @media (prefers-reduced-motion: reduce) {
      &:active {
        transform: none;
      }
    }

    &::after {
      --size: 120%;

      content: '';

      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;

      width: var(--size);
      height: var(--size);

      border-radius: 50%;
      background-color: #ffe6ed;

      transform: translate(-50%, -51.5%) scale(var(--bg-scale));

      @supports (aspect-ratio: 1/1) {
        height: unset;

        aspect-ratio: 1/1;
      }

      @media (prefers-color-scheme: light) {
        background-color: #030303;
      }
    }

    @media (prefers-color-scheme: light) {
      color: #030303;
    }
  }
}
</style>
