<template>
  <div ref="menu" class="menu">
    <div
      v-for="key in backItemsCount"
      :key="key"
      ref="menuBackItems"
      class="menu__back-item"
    ></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isShowingMenu: false,
    backItemsCount: 5,
    prevAnimation: null,
  }),
  computed: {
    windowHeight() {
      return typeof window !== 'undefined' ? window.innerHeight : 1080
    },
  },
  mounted() {
    this.$nuxt.$on('toggle-menu', () => {
      if (this.prevAnimation && this.prevAnimation.isActive()) return

      if (this.isShowingMenu) this.hideMenu()
      else this.showMenu()

      this.isShowingMenu = !this.isShowingMenu
    })
  },
  methods: {
    showMenu() {
      const tl = this.$gsap.timeline()

      tl.set(this.$refs.menu, { opacity: 1, pointerEvents: 'all' })

      tl.from(this.$refs.menuBackItems, {
        yPercent: 100,
        rotateX: -80,
        opacity: 0,
        transformOrigin: 'center top',
        transformStyle: 'preserve-3d',
        stagger: 0.075,
      })
    },
    hideMenu() {
      this.$gsap.to(this.$refs.menu, { opacity: 0, pointerEvents: 'none' })
    },
  },
}
</script>

<style lang="scss">
.menu {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
  opacity: 0;

  &__back-item {
    $ITEMS_COUNT: 5;

    position: absolute;
    left: 0;
    right: 0;
    height: calc(100vh / #{$ITEMS_COUNT});

    @for $i from 0 to $ITEMS_COUNT {
      &:nth-child(#{$i + 1}) {
        top: calc(#{$i} * calc(100vh / #{$ITEMS_COUNT}));
      }
    }

    background-color: var(--black-color);
  }
}
</style>
