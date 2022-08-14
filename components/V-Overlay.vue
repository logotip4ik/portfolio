<script setup>
const routeChanging = useRouteChanging();

const numberOfLoadingPoints = 3;
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
      --circle-size: 1rem;
      --initial-delay: 2.25s;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      top: calc(50% + 1.5rem);
      left: 50%;

      opacity: 0;

      transition: opacity 0.4s;
      transform: translateX(-50%);

      &--animate {
        opacity: 0.65;
      }

      &__circle {
        display: block;

        color: var(--ff-color);

        width: var(--circle-size);
        height: var(--circle-size);

        opacity: 0;

        &:nth-of-type(even) {
          margin-inline: 25%;
        }

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
