<script setup>
const { $smoothScroll } = useNuxtApp();
const { gsap, ScrollTrigger } = useGsap();
const emitter = useEmitter();

const routeChanging = ref(false);

const numberOfLoadingPoints = 3;

defineExpose({ leavePageAnim, enterPageAnim });

function leavePageAnim(pageEl, done) {
  routeChanging.value = true;

  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onStart: () => {
      $smoothScroll.disable();
    },
    onComplete: () => {
      done();
    },
  });

  tl.to(pageEl, { y: -300, duration: 1 }, 0);
  tl.fromTo(
    '.page-overlay__slide',
    {
      opacity: 1,
      pointerEvents: 'all',
      yPercent: 15,
      clipPath: 'inset(85% 0% 0% 0%)',
    },
    {
      yPercent: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      stagger: { each: 0.1 },
      duration: 0.75,
      onComplete: () => {
        $smoothScroll.scrollTo(0, 0);
      },
    },
    0
  );
  tl.fromTo(
    '.page-overlay__slide__text',
    { yPercent: 105, autoAlpha: 1 },
    { yPercent: 0, ease: 'expo.out' },
    0.25
  );
}

function enterPageAnim(pageEl, done) {
  routeChanging.value = true;

  const tl = gsap.timeline({
    delay: 0.15,
    defaults: { ease: 'expo.out' },
    paused: true,
    onStart: () => {
      routeChanging.value = false;

      emitter.emit('pointer:inactive');
    },
    onComplete: () => {
      done();

      // when user was scrolling down, the nav will be hidden, but
      // on a new page the nav should be visible
      gsap.to('.nav', { autoAlpha: 1 });
    },
  });

  tl.fromTo(pageEl, { y: 300 }, { y: 0, duration: 1, clearProps: 'y' }, 0.2);

  tl.fromTo(
    '.page-overlay__slide',
    {
      opacity: 1,
      pointerEvents: 'all',
      yPercent: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
    },
    {
      yPercent: -15,
      clipPath: 'inset(0% 0% 85% 0%)',
      stagger: { each: 0.1, from: 'end' },
      duration: 0.75,
    },
    0.2
  );
  tl.add(() => ScrollTrigger.refresh(), '<+0.275');
  tl.add(() => $smoothScroll.enable(), '<+0.275');
  tl.add(() => emitter.emit('overlay:hiding'), '<-0.5');

  tl.fromTo(
    '.page-overlay__slide__text',
    { yPercent: 0, autoAlpha: 1 },
    { yPercent: -125, ease: 'expo.out' },
    0
  );

  emitter.once('images:loaded', () => tl.play());
}
</script>

<template>
  <div class="page-overlay">
    <div class="page-overlay__slide"></div>
    <div class="page-overlay__slide">
      <div class="page-overlay__slide__text__wrapper">
        <p
          class="page-overlay__slide__text"
          style="opacity: 0; visibility: hidden"
        >
          {{ $route.params.slug || 'index' }}
        </p>
      </div>

      <div
        :class="{
          'page-overlay__slide__loading': true,
          'page-overlay__slide__loading--animate': routeChanging,
        }"
      >
        <svg
          v-for="key in numberOfLoadingPoints"
          :key="key"
          viewBox="0 0 16 16"
          :class="{
            'page-overlay__slide__loading__circle': true,
            'page-overlay__slide__loading__circle--animate': routeChanging,
          }"
          :style="{ '--circle-offset': `${key * 0.077}s` }"
        >
          <circle cx="8" cy="8" r="8" fill="currentColor" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  pointer-events: none;

  &__slide {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &:nth-of-type(1) {
      z-index: 1;

      background: #201d1e;
      background: linear-gradient(0deg, #201d1e 0%, #605659 50%, #201d1e 100%);

      @media (prefers-color-scheme: light) {
        background-color: var(--primary-color);

        background: #ffe6ed;
        background: linear-gradient(
          0deg,
          #ffe6ed 0%,
          #fff6f8 50%,
          #ffe6ed 100%
        );
      }
    }

    &:nth-of-type(2) {
      z-index: 2;

      background-color: var(--surface-color);
    }

    &__text {
      display: inline-block;

      font-size: var(--step-1);

      margin: 0;

      opacity: 0.8;

      &__wrapper {
        position: relative;

        overflow: hidden;

        max-width: 60vw;
      }
    }

    &__loading {
      --circle-size: clamp(0.5rem, calc(var(--step--2) - 0.5rem), 0.95rem);
      --initial-delay: 2.25s;
      --circles-number: 3;

      display: grid;
      grid-template-columns: repeat(1fr, var(--circles-number));
      grid-auto-flow: column;
      gap: calc(var(--circle-size) / 1.25);

      position: absolute;
      top: calc(50% + 1.5rem);
      left: 50%;

      opacity: 0;

      transition: opacity 0.2s;
      transform: translateX(-50%);

      &--animate {
        opacity: 0.65;
        transition: opacity 0.4s;
      }

      &__circle {
        display: block;

        color: var(--ff-color);

        width: var(--circle-size);
        height: var(--circle-size);

        opacity: 0;

        &--animate {
          animation: infinite 2.5s fade-in-out
            calc(var(--initial-delay) + var(--circle-offset, 0s));
        }
      }
    }
  }
}

@keyframes fade-in-out {
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}
</style>
