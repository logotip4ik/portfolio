<script setup>
import MenuIconSVG from '~/assets/img/menu-icon.svg';

const { $smoothScroll, $isDarkMode } = useNuxtApp();
const { gsap } = useGsap();
const currentSection = useCurrentSection();
const isMenuActive = useMenuToggle();

const nav = ref(null);
const navTitle = ref(null);
const navList = ref(null);
const navMenuButton = ref(null);
const navMenuButtonSVG = ref(null);

const links = [
  { label: 'Home', action: () => $smoothScroll.scrollTo(0) },
  { label: 'Projects', action: () => $smoothScroll.scrollTo('.projects') },
  { label: 'About', action: () => $smoothScroll.scrollTo('.about-me') },
  { label: 'Contact', action: () => $smoothScroll.scrollTo('.contact') },
];

const SVG_SIZE = 20;
const SVG_LINES_PADDING = 5;

const svgColorIdle = { light: '#bababa', dark: '#bababa' };
const svgColorActive = { light: '#030303', dark: '#030303' };

function hoverAnimation() {
  if (isMenuActive.value) return;

  const lines = navMenuButtonSVG.value.$el.children;
  // NOTE: just setting first x coordinate of two lines to padding
  gsap.to(lines, {
    attr: { x1: SVG_LINES_PADDING },
    ease: 'back.out',
  });
}

function closeAnimation() {
  const isDarkMode = $isDarkMode();

  const lines = navMenuButtonSVG.value.$el.children;

  const tl = gsap.timeline({ defaults: { ease: 'back.out' } });
  const line0Attrs = {
    x1: SVG_SIZE - SVG_LINES_PADDING,
    y1: SVG_LINES_PADDING,
    x2: SVG_LINES_PADDING,
    y2: SVG_SIZE - SVG_LINES_PADDING,
  };
  const line1Attrs = {
    x1: SVG_LINES_PADDING,
    y1: SVG_LINES_PADDING,
    x2: SVG_SIZE - SVG_LINES_PADDING,
    y2: SVG_SIZE - SVG_LINES_PADDING,
  };
  // if (this.prefersReducedMotion) {
  //   tl.to(lines, { opacity: 0 })
  //   tl.set(lines[0], { attr: line0Attrs })
  //   tl.set(lines[1], { attr: line1Attrs })
  //   tl.set(lines, {
  //     color: isDarkMode ? svgColorActive.dark : svgColorActive.light,
  //   })
  //   tl.set(navMenuButton, { '--bg-scale': '1' }, 0)
  //   tl.to(lines, { opacity: 1 })
  // } else {
  tl.to(lines, {
    color: isDarkMode ? svgColorActive.dark : svgColorActive.light,
  });
  tl.to(lines[0], { attr: line0Attrs }, 0);
  tl.to(lines[1], { attr: line1Attrs }, '<');
  tl.to(navMenuButton.value, { '--bg-scale': '1' }, '0.135');
  // }
}

function idleAnimation() {
  if (isMenuActive.value) return;

  const isDarkMode = $isDarkMode();

  const lines = navMenuButtonSVG.value.$el.children;

  const tl = gsap.timeline({ defaults: { ease: 'back.out' } });
  const line0Attrs = { x1: 0.25, y1: 7.75, x2: 19.75, y2: 7.75 };
  const line1Attrs = { x1: 5.25, y1: 11.75, x2: 19.75, y2: 11.75 };
  // NOTE: just reverting everything to default
  // if (this.prefersReducedMotion) {
  //   tl.to(lines, { opacity: 0 })
  //   tl.set(lines[0], { attr: line0Attrs })
  //   tl.set(lines[1], { attr: line1Attrs })
  //   tl.set(lines, {
  //     color: isDarkMode ? svgColorIdle.dark : svgColorIdle.light,
  //   })
  //   tl.set(navMenuButton, { '--bg-scale': '0' })
  //   tl.to(lines, { opacity: 1 })
  // } else {
  tl.to(lines, {
    color: isDarkMode ? svgColorIdle.dark : svgColorIdle.light,
  });
  tl.to(navMenuButton.value, { '--bg-scale': '0', ease: 'power2.out' }, 0);
  tl.to(lines[0], { attr: line0Attrs }, 0);
  tl.to(lines[1], { attr: line1Attrs }, '<');
  // }
}

function toggleMenu() {
  isMenuActive.value = !isMenuActive.value;
}

watch(isMenuActive, (val) => {
  if (val) closeAnimation();
  else idleAnimation();
});

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
        autoAlpha: 1,
        ease: 'expo.out',
        onStart: () => (prevScrollY = scroll.y),
      });

    const scrollingDown = prevScrollY - scroll.y < 0;

    if (scrollingDown) gsap.to(nav.value, { autoAlpha: 0, ease: 'expo.out' });
    else gsap.to(nav.value, { autoAlpha: 1, ease: 'expo.out' });

    prevScrollY = scroll.y;
  });

  gsap.fromTo(
    navTitle.value,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.header',
        start: 'bottom 5%',
        end: 'bottom 5%',
        toggleActions: 'play none reverse none',
      },
    }
  );

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
    <p
      ref="navTitle"
      v-hoverable.action
      tabindex="0"
      class="nav__title"
      @click="() => $smoothScroll.scrollTo(0)"
    >
      BK
    </p>

    <ul ref="navList" class="nav__list">
      <li
        v-for="(link, key) in links"
        :key="key"
        v-hoverable.action
        tabindex="0"
        class="nav__list__item"
        @click="link.action"
        @keypress.space.enter.prevent="link.action"
      >
        {{ link.label }}
      </li>
    </ul>

    <button
      ref="navMenuButton"
      aria-label="menu button"
      class="nav__menu-button"
      @click="toggleMenu"
      @keypress.space.enter="toggleMenu"
      @pointerenter="hoverAnimation"
      @pointerleave="idleAnimation"
    >
      <MenuIconSVG ref="navMenuButtonSVG" />
    </button>
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

  padding: 1.75rem 0;

  color: #bababa;
  pointer-events: none;
  mix-blend-mode: exclusion;

  transform: translateX(-50%);

  &__title {
    font-size: var(--step-3);

    margin: 0;

    pointer-events: all;
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
    pointer-events: all;

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

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  &__menu-button {
    --bg-scale: 0;

    position: relative;
    z-index: 1;

    width: max(var(--step-5), 4rem);
    height: auto;

    padding: 0;
    margin: 0;

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

    @media (prefers-reduced-motion: reduce) {
      &:active {
        transform: none;
      }
    }

    &::after {
      --size: 120%;

      content: '';

      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;

      width: var(--size);
      height: var(--size);

      border-radius: 50%;
      background-color: var(--primary-color, #ffe6ed);
      transform: translate(-50%, -51.5%) scale(var(--bg-scale));

      @supports (aspect-ratio: 1/1) {
        height: unset;
        aspect-ratio: 1/1;
      }
    }
  }
}
</style>
