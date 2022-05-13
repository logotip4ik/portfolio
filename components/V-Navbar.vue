<script setup>
const { $smoothScroll } = useNuxtApp();
const { gsap } = useGsap();
const currentSection = useCurrentSection();

const nav = ref(null);
const navList = ref(null);

const links = [
  { label: 'Home', action: () => null },
  { label: 'Projects', action: () => null },
  { label: 'About', action: () => null },
  { label: 'Contact', action: () => null },
];

watch(currentSection, (val) => {
  const heightOfChild = navList.value.children[0].clientHeight + 4;

  gsap.to(navList.value, {
    '--indicator-offset': `${heightOfChild * val}px`,
    ease: 'expo.out',
  });
});

onMounted(() => {
  const visibleOffset = 150;
  let prevScrollY = 0;

  $smoothScroll.on('scroll', ({ scroll }) => {
    if (visibleOffset > scroll.y)
      return gsap.to(nav.value, {
        opacity: 1,
        ease: 'expo.out',
        onStart: () => (prevScrollY = scroll.y),
      });

    const scrollingDown = prevScrollY - scroll.y < 0;

    if (scrollingDown) gsap.to(nav.value, { opacity: 0, ease: 'expo.out' });
    else gsap.to(nav.value, { opacity: 1, ease: 'expo.out' });

    prevScrollY = scroll.y;
  });

  gsap.fromTo(
    navList.value,
    { '--indicator-opacity': 0 },
    {
      '--indicator-opacity': 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.header',
        start: '40% top',
        end: '40% top',
        toggleActions: 'play none reverse none',
      },
    }
  );
});
</script>

<template>
  <nav ref="nav" class="nav" data-scroll-sticky>
    <p class="nav__title">BK</p>

    <ul ref="navList" class="nav__list">
      <li
        v-for="(link, key) in links"
        :key="key"
        tabindex="0"
        class="nav__list__item"
        @click="link.action"
      >
        {{ link.label }}
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 50%;
  z-index: 9;

  width: 95%;
  max-width: 1400px;

  padding: 1rem 0;

  color: var(--surface-color);
  mix-blend-mode: exclusion;

  transform: translateX(-50%);

  &__title {
    font-size: var(--step-3);

    margin: 0;
  }

  &__list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;

    position: relative;
    z-index: 1;

    margin: 0;
    padding: 0;

    list-style-type: none;

    &__item {
      font-size: calc(var(--step--2) - 0.05rem);

      &:not(:first-of-type) {
        margin-top: 0.25rem;
      }
    }

    &::after {
      --size: calc(var(--step--2) - 0.5rem);

      content: '';

      position: absolute;
      top: 0.25rem;
      right: 115%;

      width: var(--size);
      height: var(--size);

      opacity: var(--indicator-opacity);
      border-radius: 50%;
      background-color: var(--surface-color);

      transform: translateY(var(--indicator-offset, 0px));
    }
  }
}
</style>
