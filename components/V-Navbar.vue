<template>
  <nav class="nav">
    <p
      ref="navTitle"
      class="nav__title serif"
      tabindex="0"
      @click="$scrollTo(0)"
      @keypress.enter="$scrollTo(0)"
    >
      BK
    </p>
  </nav>
</template>

<script>
export default {
  mounted() {
    const { navTitle } = this.$refs

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
          scrub: 0.75,
          onEnter: () => navTitle.setAttribute('tabindex', 0),
          onLeaveBack: () => navTitle.setAttribute('tabindex', -1),
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

  padding-inline: clamp(1rem, 4vw, 5rem);
  pointer-events: none;
  color: #dfdfdf;

  &__title {
    font-size: var(--step-2);
    opacity: 0;

    margin: 0;
    padding-block: 1.75rem;
    padding-inline: var(--step-0);
    pointer-events: all;
    cursor: pointer;
  }
}
</style>
