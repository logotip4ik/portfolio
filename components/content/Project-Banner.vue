<script setup>
const bannerRef = ref(null);

const { gsap } = useGsap();
const emitter = useEmitter();

const showBanner = () =>
  gsap.to(bannerRef.value, {
    yPercent: -400,
    delay: 0.55,
    duration: 0.65,
    ease: 'back.out(0.8)',
  });

emitter.once('overlay:hiding', showBanner);
</script>

<template>
  <div
    ref="bannerRef"
    :class="{ banner: true, 'banner--grid': $slots.icon }"
    data-scroll-sticky
  >
    <div v-if="$slots.icon" class="banner__icon">
      <Markdown :use="$slots.icon" />
    </div>

    <p class="banner__text">
      <Markdown :use="$slots.default" :unwrap="true" />
    </p>
  </div>
</template>

<style lang="scss">
.banner {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  z-index: 4;

  width: 92%;
  max-width: 900px;

  padding: 1.25rem 1.5rem;

  border: 1px solid darken($color: #ffe6ed, $amount: 1.5);
  border-radius: 0.5rem;
  background-color: transparentize($color: #ffe6ed, $amount: 0.9);
  // https://shadows.brumm.af/
  // prettier-ignore
  box-shadow:
    0px 1.3px 5.3px rgba(0, 0, 0, 0.008),
    0px 4.5px 17.9px rgba(0, 0, 0, 0.012),
    0px 20px 80px rgba(0, 0, 0, 0.02)
  ;
  backdrop-filter: blur(5px);

  transform: translate(-50%, 400%);

  &--grid {
    display: grid;
    grid-template-columns: var(--step-0) auto;
    align-items: center;
    gap: var(--step--2);
  }

  &__icon {
    width: 100%;
    height: auto;

    opacity: 0.75;
  }

  &__text {
    font-size: var(--step--1);
    text-align: left;

    width: 100%;

    opacity: 0.75;
    margin: 0;
  }
}
</style>
