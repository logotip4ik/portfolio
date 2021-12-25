<template>
  <nav :class="{ navbar: true, 'navbar--hidden': isNavbarHidden }">
    <ul class="navbar__navigation">
      <NavbarItem
        v-for="(link, key) in links"
        :key="key"
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
    const ScrollTrigger = this.$ScrollTrigger
    const toggleNavbarProp = this.toggleDataPropFactory('isNavbarHidden')

    ScrollTrigger.create({
      onUpdate: ({ progress }) => toggleNavbarProp(progress * 100),
    })
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
