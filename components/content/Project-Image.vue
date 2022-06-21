<script setup>
const props = defineProps({
  alt: { type: String, required: true, default: '' },
  src: { type: String, required: true, default: '' },
  type: { type: String, required: false, default: '' },
});

const imageRef = ref(null);
const imageWrapperRef = ref(null);

const { gsap } = useGsap();

onMounted(() => {
  if (props.type !== 'fwidth') return;

  const imageScale = 20;

  gsap.set(imageRef.value, { scale: 1 + imageScale * 0.01 });
  gsap.fromTo(
    imageRef.value,
    { yPercent: -imageScale / 2 },
    {
      yPercent: imageScale / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: imageWrapperRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.1,
      },
    }
  );
});
</script>

<template>
  <img
    v-if="type !== 'fwidth'"
    ref="imageRef"
    :src="src"
    :alt="alt"
    :width="type === 'fwidth' ? 1400 : 900"
    height="550"
    class="project-image"
    decoding="async"
  />
  <div v-else ref="imageWrapperRef" class="project-image__wrapper">
    <img
      ref="imageRef"
      :src="src"
      :alt="alt"
      :class="{
        'project-image': true,
        'project-image--fwidth': type === 'fwidth',
      }"
      :width="type === 'fwidth' ? 1400 : 900"
      height="550"
      decoding="async"
      fetch-priority="high"
    />
  </div>
</template>

<style lang="scss">
.project-image {
  display: block;

  width: 100%;
  height: auto;

  box-shadow: 0 0 1rem 0 rgba($color: #000000, $alpha: 0.025);

  &--fwidth {
    position: relative;
    z-index: -1;

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
