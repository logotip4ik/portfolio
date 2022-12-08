<template>
  <div tabindex="0" class="flag-stripe" data-scroll-sticky>
    <div class="flag-stripe__line"></div>
    <div class="flag-stripe__line"></div>

    <NuxtLink
      v-hoverable.outer-link
      href="https://u24.gov.ua"
      target="_blank"
      class="flag-stripe__content"
    >
      Help Ukraine
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.flag-stripe {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 5;

  width: calc(var(--step-5) + 1.25rem);
  height: 100vh;

  transform: translateX(calc(-100% + var(--step--2) - 0.075rem));

  transition: transform 400ms ease;

  &:focus {
    transform: none;
  }

  @media (hover: hover) {
    &:hover {
      transform: none;
    }
  }

  &__line {
    position: absolute;
    left: 0;
    right: 0;

    height: 50%;

    &:nth-child(1) {
      background-color: #2659ac;
      top: 0;
    }
    &:nth-child(2) {
      background-color: #f8d447;
      top: 50%;
    }
  }

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;

    font-size: calc(var(--step-2) - 0.125rem);
    color: #030303;
    text-transform: capitalize;
    text-decoration: none;

    white-space: nowrap;
    transform: translate(-50%, -50%) rotate(90deg);

    @supports (mix-blend-mode: difference) {
      color: #ebebeb;
      mix-blend-mode: exclusion;
    }
  }
}
</style>
