<template>
  <div class="page-overlay">
    <div class="page-overlay__slide"></div>
    <div class="page-overlay__slide"></div>
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &:nth-of-type(1) {
      z-index: 1;

      // background-color: hsl(343 20% 35%);
      background-color: #8e8285;

      @media (prefers-color-scheme: light) {
        background-color: var(--primary-color);
      }
    }

    &:nth-of-type(2) {
      z-index: 2;

      background-color: var(--surface-color);
    }
  }
}
</style>
