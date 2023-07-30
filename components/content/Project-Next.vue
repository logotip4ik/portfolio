<script setup>
const route = useRoute();
const { data: surrounded } = await useAsyncData(
  `surround-project-${route.params.slug}`,
  () => queryContent('project').findSurround(route.fullPath),
);

const next = computed(() => surrounded.value[1] || surrounded.value[0]);

if (process.server) {
  useHead(
    {
      link: [
        { rel: 'next', href: next.value._path },
        { rel: 'prefetch', href: next.value.previewImage },
      ],
    },
    { mode: 'server' },
  );
}
</script>

<template>
  <NuxtLink v-hoverable.link :href="next._path" class="project-next">
    <img
      :src="next.previewImage"
      :alt="next.title"
      class="project-next__image"
      data-scroll
      data-scroll-speed="-4"
      data-scroll-position="bottom"
    />

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

  font-size: var(--step-2);
  color: currentColor;
  text-decoration: none;

  min-height: min(23.5rem, 45vh);

  padding: 1rem 4rem;
  margin-top: 10rem;

  overflow: hidden;
  cursor: none;

  &__image {
    display: block;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -3;

    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center center;

    filter: blur(12px);

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
    top: -2px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(
      to bottom,
      var(--surface-color) 0%,
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

    background-color: var(--surface-color);

    opacity: 0.25;
  }
}
</style>
