<script setup>
import SourceSVG from '~/assets/img/source.svg';

const { gsap } = useGsap();

const projectEl = ref(null);
const projectImage = ref(null);
const projectImageWrapper = ref(null);
const projectSource = ref(null);

const props = defineProps({
  id: { type: Number, required: true, default: 0 },
  project: { type: Object, required: true, default: () => ({}) },
});

const tagsString = computed(() =>
  props.project.tags.reduce((str, val) => `${str}, ${val}`)
);

onMounted(() => {
  const imageResizeObserver = new ResizeObserver(() => {
    if (!props.project.source) return;

    gsap.to(projectSource.value.$el, {
      '--image-height': `${projectImageWrapper.value.clientHeight}px`,
    });
  });

  imageResizeObserver.observe(projectImage.value);

  gsap.fromTo(
    projectEl.value.children[0],
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      ease: 'expo.out',
      duration: 1.25,
      scrollTrigger: {
        trigger: projectEl.value,
        start: 'top bottom-=10%',
        once: true,
      },
    }
  );
});
</script>

<template>
  <li
    ref="projectEl"
    class="project"
    data-scroll
    :data-scroll-speed="id % 2 === 0 ? -0.5 : 1"
  >
    <NuxtLink v-hoverable class="project__wrapper" :href="project.live">
      <div ref="projectImageWrapper" class="project__image__wrapper">
        <img
          ref="projectImage"
          :src="project.image"
          :alt="project.title"
          class="project__image"
        />
      </div>

      <div class="project__content">
        <h3 class="project__content__title">
          {{ project.title }}
        </h3>
        <p class="project__content__tags">
          {{ tagsString }}
        </p>
      </div>
    </NuxtLink>
    <NuxtLink
      v-if="project.source"
      ref="projectSource"
      v-hoverable.source
      :href="project.source"
      class="project__source"
    >
      <SourceSVG />
    </NuxtLink>
  </li>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.project {
  position: relative;

  max-width: 475px;
  will-change: transform, opacity;

  &__wrapper {
    display: grid;
    grid-template-rows: fit-content fit-content;
    gap: 1rem;

    cursor: none;
    text-decoration: none;

    @media (prefers-reduced-motion: reduce) {
      cursor: pointer;
    }
  }

  &__image {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center center;

    &__wrapper {
      width: 100%;
      height: 40vw;
      min-height: 20rem;
      max-height: 30rem;

      overflow: hidden;

      @supports (aspect-ratio: 1/1) {
        aspect-ratio: 1/1;

        height: unset;
        max-height: unset;
        min-height: unset;
      }
    }
  }

  &__content {
    &__title {
      font-size: calc(var(--step-0) + 0.4rem);
      letter-spacing: 0.25px;
      color: #cccccc;

      margin-bottom: 0;

      @media (prefers-color-scheme: light) {
        color: #424242;
      }
    }

    &__tags {
      color: #bfbfbf;
      font-size: calc(var(--step--2) - 0rem);

      @media (prefers-color-scheme: light) {
        color: #4b4b4b;
      }
    }
  }

  &__source {
    --pd: 0.5rem;
    --size: calc(var(--step-4) * 1.125);

    position: absolute;
    z-index: 1;
    top: calc(var(--image-height) - var(--pd));
    right: var(--pd);

    color: var(--ff-color);
    mix-blend-mode: screen;

    max-width: var(--size);
    max-height: var(--size);

    cursor: none;

    transform: translateY(-100%);
  }

  &::after {
    content: '';

    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    opacity: 0;
    background-color: rgba($color: #030303, $alpha: 0.45);
    pointer-events: none;

    transition: opacity 400ms, background-color 400ms;

    @media (prefers-color-scheme: light) {
      background-color: rgba($color: #ebebeb, $alpha: 0.25);
    }

    @media (hover: hover) {
      opacity: 1;
    }
  }

  &:is(:focus-within, :hover) {
    &::after {
      opacity: 0;
    }
  }
}
</style>
