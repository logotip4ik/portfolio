<script setup>
const route = useRoute();

const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryContent(`projects/${route.params.slug}`).findOne()
);

const { gsap } = useGsap();
const emitter = useEmitter();

useSeoHead({ title: project.value.title });

onMounted(() => {
  gsap.set('.nav__back-link', { autoAlpha: 0 });

  const showBackButton = () =>
    gsap.fromTo(
      '.nav__back-link',
      { autoAlpha: 0 },
      { autoAlpha: 1, delay: 0.5 }
    );

  emitter.on('overlay:hiding', showBackButton);

  onBeforeUnmount(() => {
    emitter.off('overlay:hiding', showBackButton);
  });
});
</script>

<template>
  <div class="projects-page">
    <ContentDoc />
  </div>
</template>

<style lang="scss">
.projects-page {
  min-height: 100vh;
}
</style>
