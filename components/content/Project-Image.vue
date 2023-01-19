<script setup>
const props = defineProps({
  alt: { type: String, required: true, default: '' },
  src: { type: String, required: true, default: '' },
  type: { type: String, required: false, default: '' },
  preload: { type: Boolean, required: false, default: false },
});

const imageRef = ref(null);
const imageWrapperRef = ref(null);

const { gsap } = useGsap();

if (props.preload) {
  useHead({
    link: [{ rel: 'preload', as: 'image', href: props.src }],
  });
}

onMounted(() => {
  if (props.type !== 'fwidth') return;

  const imageScaleInPercent = 150;
  const speedDivider = 3.5;

  gsap.set(imageRef.value, { scale: imageScaleInPercent * 0.01 });
  const animation = gsap.fromTo(
    imageRef.value,
    { y: -imageRef.value.clientHeight / speedDivider },
    {
      y: imageRef.value.clientHeight / speedDivider,
      ease: 'none',
      scrollTrigger: {
        trigger: imageWrapperRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.1,
      },
    }
  );

  onBeforeUnmount(() => {
    animation.scrollTrigger.kill();
  });
});
</script>

<template>
  <div
    v-if="type === 'fwidth'"
    ref="imageWrapperRef"
    class="project-image__wrapper"
  >
    <img
      ref="imageRef"
      :src="src"
      :alt="alt"
      class="project-image project-image--fwidth"
      :width="type === 'fwidth' ? 1400 : 900"
      height="550"
      decoding="async"
      fetchpriority="high"
    />
  </div>
  <img
    v-else
    ref="imageRef"
    :src="src"
    :alt="alt"
    :width="type === 'fwidth' ? 1400 : 900"
    height="550"
    class="project-image"
    decoding="async"
  />
</template>

<style lang="scss">
.project-image {
  display: block;

  width: 100%;
  height: auto;

  object-fit: cover;

  box-shadow: 0 0 1rem 0 rgba($color: #000000, $alpha: 0.025);

  &--fwidth {
    position: relative;
    z-index: -1;

    max-height: 90vh;

    opacity: 1;
    box-shadow: none;

    transition: none;
    transition-delay: none;
  }

  &__wrapper {
    position: relative;
    z-index: 1;

    width: 100%;
    height: auto;

    overflow: hidden;

    box-shadow: 0 0 1rem 0 rgba($color: #000000, $alpha: 0.025);
  }
}
</style>
