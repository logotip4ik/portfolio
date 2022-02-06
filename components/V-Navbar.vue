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
          :class="{
            nav__sections__list__section: true,
            'nav__sections__list__section--active': key === currentSection,
            'nav__sections__list__section--non-active':
              key !== currentSection && isShowingCurrentSection,
          }"
          @click="$scrollTo(section.scrollTo)"
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
  props: { currentSection: { type: Number, required: true, default: 0 } },
  data: () => ({
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
      const { navSections, navSectionsListSections, navSectionsCircle } =
        this.$refs

      const oneHeight =
        1.5 + navSections.clientHeight / navSectionsListSections.length

      this.$gsap.to(navSectionsCircle, {
        '--top-offset': val * oneHeight,
        ease: 'back.out',
        duration: 0.3,
      })
    },
  },
  mounted() {
    const { navTitle } = this.$refs

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

  padding: 1rem var(--x-padding);
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
    position: relative;

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

        &--non-active {
          color: darken($color: white, $amount: 60);
          transition: color 400ms var(--ease-back);
        }

        &:is(:hover, :focus) {
          color: white;
          transition: none;
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
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  &__menu-button {
    width: max(var(--step-5), 4rem);
    height: auto;

    padding: 0.75rem 0;
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
