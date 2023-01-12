<script setup>
const { gsap } = useGsap();
const emitter = useEmitter();
const prefersReducedMotion = useReducedMotion();

const subtitleText = 'Front End Developer';

const header = ref(null);

function revealContent() {
  const mainTl = gsap.timeline({
    defaults: { ease: 'expo.out', duration: 1.25 },
    onStart: () => {
      emitter.off('loader:end', revealContent);
      emitter.off('overlay:hiding', revealContent);
    },
  });

  if (prefersReducedMotion.value)
    mainTl.fromTo(
      '.header__container__title__line__content',
      { opacity: 0 },
      { opacity: 1, stagger: 0.175 }
    );
  else
    mainTl.fromTo(
      '.header__container__title__line__content',
      { yPercent: 100, opacity: 1 },
      { yPercent: 0, duration: 1.5, stagger: 0.175 }
    );

  mainTl.to(
    '.header__container__subtitle__char',
    {
      opacity: 1,
      stagger: { from: 'center', amount: 0.35 },
    },
    '-=0.75'
  );

  mainTl.to('.scroll-down', { opacity: 1 }, '<+0.5');

  mainTl.to(
    // breakpoint in navbar
    window.innerWidth < 768 ? '.nav__menu-button' : '.nav__list__item',
    { opacity: 1, stagger: 0.125 },
    '-=0.75'
  );
}

emitter.on('loader:end', revealContent);
emitter.on('overlay:hiding', revealContent);

onBeforeUnmount(() => {
  gsap.set('.header__container__title__line__content', {
    clearProps: 'all',
  });
});
</script>

<template>
  <header ref="header" class="header" data-scroll-section>
    <VHeaderBackground class="header__canvas" />

    <div class="header__container">
      <h1 class="header__container__title">
        <span class="header__container__title__line">
          <span class="header__container__title__line__content">Bogdan</span>
        </span>
        <span
          class="header__container__title__line header__container__title__line--pl"
        >
          <span class="header__container__title__line__content">Kostyuk</span>
        </span>
      </h1>

      <p class="header__container__subtitle">
        <span
          v-for="(char, key) in subtitleText"
          :key="key"
          class="header__container__subtitle__char"
          >{{ char }}</span
        >
      </p>
    </div>

    <div class="header__bottom-bar">
      <VScrollDown />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  --100vh: calc(100 * var(--vh, 1vh));

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1;

  height: var(--100vh);
  height: 100svh;

  overflow: hidden;
  background-color: var(--surface-color);

  &::before {
    --h: clamp(10rem, 12vh, 12.5rem);

    content: '';

    position: absolute;
    top: calc(var(--100vh) - var(--h));
    top: calc(100svh - var(--h));
    left: 0;
    right: 0;

    height: var(--h);

    // https://larsenwork.com/easing-gradients/
    background: linear-gradient(
      0deg,
      rgb(1.176% 1.176% 1.176%) 0%,
      rgb(1.176% 1.176% 1.176% / 0.9903926402016152) 6.25%,
      rgb(1.176% 1.176% 1.176% / 0.9619397662556434) 12.5%,
      rgb(1.176% 1.176% 1.176% / 0.9157348061512727) 18.75%,
      rgb(1.176% 1.176% 1.176% / 0.8535533905932737) 25%,
      rgb(1.176% 1.176% 1.176% / 0.7777851165098011) 31.25%,
      rgb(1.176% 1.176% 1.176% / 0.6913417161825449) 37.5%,
      rgb(1.176% 1.176% 1.176% / 0.5975451610080642) 43.75%,
      rgb(1.176% 1.176% 1.176% / 0.5) 50%,
      rgb(1.176% 1.176% 1.176% / 0.4024548389919359) 56.25%,
      rgb(1.176% 1.176% 1.176% / 0.3086582838174552) 62.5%,
      rgb(1.176% 1.176% 1.176% / 0.22221488349019902) 68.75%,
      rgb(1.176% 1.176% 1.176% / 0.14644660940672627) 75%,
      rgb(1.176% 1.176% 1.176% / 0.08426519384872733) 81.25%,
      rgb(1.176% 1.176% 1.176% / 0.03806023374435663) 87.5%,
      rgb(1.176% 1.176% 1.176% / 0.009607359798384785) 93.75%,
      rgb(1.176% 1.176% 1.176% / 0) 100%
    );

    @media (prefers-color-scheme: light) {
      background: linear-gradient(
        0deg,
        rgb(96.863% 96.863% 96.863%) 0%,
        rgb(96.863% 96.863% 96.863% / 0.9903926402016152) 6.25%,
        rgb(96.863% 96.863% 96.863% / 0.9619397662556434) 12.5%,
        rgb(96.863% 96.863% 96.863% / 0.9157348061512727) 18.75%,
        rgb(96.863% 96.863% 96.863% / 0.8535533905932737) 25%,
        rgb(96.863% 96.863% 96.863% / 0.7777851165098011) 31.25%,
        rgb(96.863% 96.863% 96.863% / 0.6913417161825449) 37.5%,
        rgb(96.863% 96.863% 96.863% / 0.5975451610080642) 43.75%,
        rgb(96.863% 96.863% 96.863% / 0.5) 50%,
        rgb(96.863% 96.863% 96.863% / 0.4024548389919359) 56.25%,
        rgb(96.863% 96.863% 96.863% / 0.3086582838174552) 62.5%,
        rgb(96.863% 96.863% 96.863% / 0.22221488349019902) 68.75%,
        rgb(96.863% 96.863% 96.863% / 0.14644660940672627) 75%,
        rgb(96.863% 96.863% 96.863% / 0.08426519384872733) 81.25%,
        rgb(96.863% 96.863% 96.863% / 0.03806023374435663) 87.5%,
        rgb(96.863% 96.863% 96.863% / 0.009607359798384785) 93.75%,
        rgb(96.863% 96.863% 96.863% / 0) 100%
      );
    }
  }

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: -2;
  }

  &__container {
    $base-color: white;

    mix-blend-mode: difference;
    cursor: default;

    transition: color 400ms;

    &__title {
      font-weight: 200;

      color: $base-color;

      margin: 0;
      margin-bottom: 0.75rem;

      &__line {
        display: block;

        line-height: 1.25;

        overflow: hidden;

        &__content {
          display: inline-block;

          opacity: 0;
        }

        &--pl {
          margin-top: clamp(-0.5rem, -1vw, -0.25rem);
          padding-left: calc(var(--step-5) * 1.5);
        }
      }
    }

    &__subtitle {
      font-size: var(--step--2);
      font-weight: 100;
      text-align: center;

      color: $base-color;
      color: darken($color: $base-color, $amount: 15);

      margin: 0;

      &__char {
        opacity: 0;
      }
    }
  }

  &__bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    top: calc(var(--100vh) - var(--step-2));
    top: calc(100svh - var(--step-4));
    left: 50%;

    width: 95%;
    max-width: 1400px;

    transform: translateX(-50%);
  }
}
</style>
