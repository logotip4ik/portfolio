<template>
  <div tabindex="0" class="flag-stripe" data-scroll-sticky>
    <NuxtLink href="https://u24.gov.ua" class="flag-stripe__content">
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

  background: linear-gradient(180deg, #2659ac 50%, #f8d447 50%);

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
