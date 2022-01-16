<template>
  <div ref="menu" class="menu">
    <div class="menu__back-item"></div>
    <div class="menu__back-item">
      <div class="menu__back-item__content">
        <p class="menu__back-item__content__title">Home</p>
      </div>
      <span class="menu__back-item__line"></span>
    </div>
    <div class="menu__back-item">
      <div class="menu__back-item__content">
        <p class="menu__back-item__content__title">Work</p>
      </div>
      <span class="menu__back-item__line"></span>
    </div>
    <div class="menu__back-item">
      <div class="menu__back-item__content">
        <p class="menu__back-item__content__title">About</p>
      </div>
      <span class="menu__back-item__line"></span>
    </div>
    <div class="menu__back-item">
      <div class="menu__back-item__content">
        <p class="menu__back-item__content__title">Contact</p>
      </div>
      <span class="menu__back-item__line"></span>
    </div>
    <div class="menu__back-item">
      <div class="menu__back-item__content menu__back-item__content--no-anim">
        <ul class="menu__back-item__content__links">
          <li
            v-for="(link, key) in links"
            :key="key"
            class="menu__back-item__content__links__item"
          >
            <a :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isShowingMenu: false,
    prevAnimation: null,
    links: [
      { label: 'linkedin', href: 'https://www.linkedin.com/in/bogdankostyuk' },
      { label: 'telegram', href: 'https://t.me/bogdankostyuk' },
      { label: 'github', href: 'https://github.com/logotip4ik' },
      { label: 'email', href: 'mailto:contact@bogdankostyuk.xyz' },
    ],
  }),
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

      tl.from('.menu__back-item', {
        yPercent: 100,
        rotateX: -90,
        opacity: 0,
        transformOrigin: 'center top',
        transformStyle: 'preserve-3d',
        stagger: 0.05,
      })
      tl.fromTo(
        this.$refs.menu,
        { backgroundColor: 'transparent' },
        { backgroundColor: '#030303' },
        '<+0.3'
      )
      tl.fromTo(
        '.menu__back-item__line',
        { transform: 'scaleX(0)' },
        {
          transform: 'scaleX(1)',
          transformOrigin: 'left bottom',
          stagger: 0.05,
        },
        '<+0.25'
      )
      tl.fromTo(
        '.menu__back-item__content__title',
        { opacity: 0, yPercent: 100 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: 'back.out',
          stagger: 0.075,
        },
        '<'
      )
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
    $ITEMS_COUNT: 6;
    --x-padding: calc(clamp(1rem, 4vw, 5rem) + var(--step-0));

    position: absolute;
    left: 0;
    right: 0;
    height: calc(100vh / #{$ITEMS_COUNT});

    padding: 1rem var(--x-padding);
    background-color: var(--black-color);

    @for $i from 0 to $ITEMS_COUNT {
      &:nth-child(#{$i + 1}) {
        top: calc(#{$i} * calc(100vh / #{$ITEMS_COUNT}));
      }
    }

    &__content {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;

      height: 100%;

      cursor: pointer;
      transform-origin: left center;
      transition: transform 200ms var(--ease-back);

      &__title {
        color: darken($color: #fff, $amount: 50);
        font-size: var(--step-3);
        line-height: 1;

        margin: 0;

        transition: color 200ms;
        transition-delay: 50ms;
      }

      &__links {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: var(--step-1);

        list-style-type: none;
        padding-inline-start: 0;

        &__item a {
          font-size: calc(var(--step--2) - 0.075rem);
          color: darken($color: #fff, $amount: 50);
          text-transform: uppercase;
          text-decoration: none;

          transition: color 100ms;

          &:is(:hover, :focus) {
            color: #ffe6ed;
          }
        }
      }

      &:is(:focus, :hover) {
        transform: scale(0.96);

        .menu__back-item__content__title {
          color: #ffe6ed;
        }
      }

      &--no-anim {
        &:is(:hover, :focus) {
          transform: none;
        }
      }
    }

    &__line {
      display: inline-block;

      position: absolute;
      bottom: 1%;
      left: var(--x-padding);
      right: var(--x-padding);

      height: 1px;
      background-color: darken($color: #fff, $amount: 75);
    }
  }
}
</style>
