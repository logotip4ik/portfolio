<script setup></script>

<template>
  <div class="scroll-down">
    <div class="scroll-down__circle" />
    <div class="scroll-down__circle" />

    <p class="scroll-down__text">Scroll</p>
  </div>
</template>

<style lang="scss">
.scroll-down {
  position: relative;

  opacity: 0;

  cursor: pointer;
  transition: color 400ms;

  &__circle {
    $anim-duration: 3s;
    --size: calc(var(--step--1));

    position: absolute;
    left: 0;
    top: 0;

    width: var(--size);
    height: var(--size);

    opacity: 0;
    border-radius: 50%;
    outline: 1px solid var(--ff-color);

    animation: cubic-bezier(0.87, 0, 0.13, 1) infinite $anim-duration
      scrollDownIndication;

    @for $i from 0 to 1 {
      &:nth-of-type(#{$i + 1}) {
        animation-delay: $i * $anim-duration;
      }
    }
  }

  &__text {
    font-size: calc(var(--step--2) * 1.125);
    color: var(--ff-color);

    margin: 0;
    padding-left: 2rem;

    opacity: 0.65;
  }
}

@keyframes scrollDownIndication {
  0% {
    opacity: 0;
    transform: translateY(0%);
  }
  10% {
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translateY(-175%);
  }
}
</style>
