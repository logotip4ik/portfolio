<template>
  <nav :class="{ navbar: true, 'navbar--hidden': isNavbarHidden }">
    <ul class="navbar__navigation">
      <li
        v-for="(link, key) in links"
        :key="key"
        class="navbar__navigation__item"
      >
        {{ link.label }}
      </li>
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
    const toggleNavbar = this.toggleNavbarFactory()
    this.$nuxt.$on('scroll', toggleNavbar)
  },
  methods: {
    toggleNavbarFactory() {
      let prevYPos = 0

      return ({ scroll }) => {
        if (scroll.y - prevYPos > 0) this.isNavbarHidden = true
        else this.isNavbarHidden = false

        prevYPos = scroll.y
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

  width: 100%;
  padding: 1rem var(--pd-x) 0;

  transition: opacity 500ms ease-out;

  &__navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    list-style-type: none;

    &__item + &__item {
      margin-left: 3vw;

      cursor: pointer;
    }
  }

  &--hidden {
    opacity: 0;
    pointer-events: none;

    transition: opacity 400ms ease-out;
  }
}
</style>
