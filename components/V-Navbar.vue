<template>
  <nav class="nav">
    <p ref="navTitle" class="nav__title serif">BK</p>

    <ul class="nav__navigation">
      <li
        v-for="(item, key) in links"
        :key="key"
        ref="navNavigationItems"
        class="nav__navigation__item"
      >
        {{ item.label }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: () => ({
    links: [{ label: 'Projects' }, { label: 'About' }, { label: 'Contact' }],
  }),
  mounted() {
    const { navTitle, navNavigationItems } = this.$refs

    const gsap = this.$gsap
    const ScrollTrigger = this.$ScrollTrigger

    ScrollTrigger.create({
      trigger: '.header',
      start: 'bottom top+=75px',
      end: 'bottom top+=75px',
      markers: true,
      onEnter: () =>
        gsap.to([navTitle, navNavigationItems], { color: '#303030' }),
      onEnterBack: () =>
        gsap.to([navTitle, navNavigationItems], { color: '#dfdfdf' }),
    })

    gsap.fromTo(
      navTitle,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: '.header',
          start: 'top+=0.75rem top',
          end: 'bottom top',
          scrub: 0.75,
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

  color: #dfdfdf;
  padding: 3rem clamp(1rem, 10vw, 7rem);

  &__title {
    font-size: var(--step-2);
    opacity: 0;

    margin: 0;
  }

  &__navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--step-2);

    font-size: var(--step--1);
    list-style-type: none;

    &__item {
      letter-spacing: 0.25px;

      mix-blend-mode: difference;

      margin: 0;
      cursor: pointer;
    }
  }
}
</style>
