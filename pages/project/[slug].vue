<script setup>
const route = useRoute();
const { gsap } = useGsap();
const emitter = useEmitter();

const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryContent(`project/${route.params.slug}`).findOne()
);

if (process.server) useHead({ htmlAttrs: { 'data-project-page': true } });

useHead({ title: project.value.title });

const projectPage = ref(null);

const showBackButton = () =>
  gsap.fromTo(
    '.nav__back-link',
    { autoAlpha: 0 },
    { autoAlpha: 1, delay: 0.7 }
  );

useImagesLoaded(projectPage, () => emitter.emit('images:loaded'));

emitter.once('overlay:hiding', showBackButton);
</script>

<template>
  <div ref="projectPage" class="projects-page">
    <ContentDoc />
  </div>
</template>

<style lang="scss">
[data-project-page] .loader {
  opacity: 0;
  pointer-events: none;
}

.projects-page {
  min-height: 100vh;
}
</style>
