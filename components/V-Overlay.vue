<template>
  <div class="page-overlay">
    <div class="page-overlay__slide"></div>
    <div class="page-overlay__slide">
      <p class="page-overlay__slide__text__wrapper">
        <span
          class="page-overlay__slide__text"
          style="opacity: 0; visibility: hidden"
        >
          {{ $route.params.slug || 'index' }}
        </span>
      </p>
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

      background-color: #8e8285;

      @media (prefers-color-scheme: light) {
        background-color: var(--primary-color);
      }
    }

    &:nth-of-type(2) {
      z-index: 2;

      background-color: var(--surface-color);
    }

    &__text {
      display: inline-block;

      font-size: var(--step-1);

      opacity: 0.8;

      &__wrapper {
        overflow: hidden;

        max-width: 60vw;
      }
    }
  }
}
</style>
