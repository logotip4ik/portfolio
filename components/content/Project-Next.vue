<script setup>
const route = useRoute();
const { data: surrounded } = await useAsyncData(
  `surround-project-${route.params.slug}`,
  () => queryContent('projects').findSurround(route.fullPath)
);

const next = computed(() =>
  surrounded.value[1] ? surrounded.value[1] : surrounded.value[0]
);
</script>

<template>
  <NuxtLink v-hoverable.link :href="next._path" class="project-next">
    <img :src="next.image" :alt="next.title" class="project-next__image" />
    {{ next.title }}
  </NuxtLink>
</template>

<style lang="scss">
.project-next {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1;

  font-size: var(--step-1);
  color: currentColor;
  text-decoration: none;

  min-height: min(20rem, 35vh);

  padding: 1rem;
  margin-top: 10rem;

  overflow: hidden;

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -3;

    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center center;

    filter: blur(15px);

    transform: scale(1.1);
  }

  &__svg {
    width: var(--step-1);
    height: auto;

    margin-left: 0.75rem;

    transform: translateY(0);
  }

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(
      to bottom,
      var(--surface-color) 0%,
      var(--surface-color) 5%,
      #00000000 100%
    );
  }

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;

    background-color: rgba($color: #030303, $alpha: 0.75);
    // backdrop-filter: blur(5px);

    @media (prefers-color-scheme: light) {
      background-color: rgba($color: #ebebeb, $alpha: 0.75);
    }
  }
}
</style>
