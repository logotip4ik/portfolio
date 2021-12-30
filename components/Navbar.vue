<template>
  <nav :class="{ navbar: true, 'navbar--hidden': isNavbarHidden }">
    <ul class="navbar__navigation">
      <!-- TODO: add click handler and scroll down to that section -->
      <NavbarItem
        v-for="(link, key) in links"
        :key="key"
        ref="navbarItems"
        class="navbar__navigation__item"
      >
        {{ link.label }}
      </NavbarItem>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data: () => ({
    isNavbarHidden: false,
    links: [{ label: 'Projects' }, { label: 'About' }, { label: 'Contact' }],
  }),
  mounted() {
    const gsap = this.$gsap

    const toggleNavbarProp = this.toggleDataPropFactory('isNavbarHidden')
    const { navbarItems } = this.$refs

    gsap.fromTo(
      navbarItems.map((item) => item.$el),
      { opacity: 0 },
      { opacity: 1, stagger: { amount: 0.1, from: 'end' }, delay: 2.75 }
    )

    // Was forced to remove scroll trigger, cuz on phones asscroll does something weirdo
    // It is not registering the scroll box, or something else. The main idea is
    //  ScrollTrigger was not updating the scrub on phones, where as said earlier,
    // asscroll was doing something weirdo.
    this.$nuxt.$asScroll.on('scroll', (progress) => toggleNavbarProp(progress))
  },
  methods: {
    toggleDataPropFactory(property) {
      let prevYPos = 0

      return (yPos) => {
        if (yPos - prevYPos > 0) this[property] = true
        else this[property] = false

        prevYPos = yPos
      }
    },
  },
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  padding: 1rem var(--pd-x) 0;

  transition: opacity 500ms ease-out;

  &__navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    list-style-type: none;
    padding: 0;

    &__item {
      & + & {
        margin-left: clamp(1.5rem, 4vw, 5rem);
      }
    }
  }

  &--hidden {
    opacity: 0;
    pointer-events: none;

    transition: opacity 800ms ease-out;
  }
}
</style>
