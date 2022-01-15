<template>
  <nav class="nav">
    <p
      ref="navTitle"
      class="nav__title serif"
      tabindex="-1"
      @click="$scrollTo(0)"
      @keypress.enter="$scrollTo(0)"
    >
      BK
    </p>

    <button ref="navMenuButton" tabindex="-1" class="nav__menu-button">
      <MenuIconSVG></MenuIconSVG>
    </button>
  </nav>
</template>

<script>
import MenuIconSVG from '~/assets/img/menu-icon.svg?inline'

export default {
  components: { MenuIconSVG },
  mounted() {
    const { navTitle, navMenuButton } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      navTitle,
      { opacity: 0 },
      {
        opacity: 1,
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
      { opacity: 0 },
      {
        opacity: 1,
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

  &__title {
    font-size: var(--step-2);

    margin: 0;
    padding-block: 1.75rem;
    padding-inline: var(--step-0);
    pointer-events: all;
    cursor: pointer;
  }

  &__menu-button {
    width: var(--step-5);
    height: var(--step-5);

    margin-inline: var(--step-0);
    color: #303030;
    border: none;
    background: transparent;

    cursor: pointer;
    pointer-events: all;
  }
}
</style>
