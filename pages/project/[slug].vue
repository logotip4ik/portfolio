<script setup>
import imagesLoaded from 'imagesloaded';

const route = useRoute();
const { gsap } = useGsap();
const emitter = useEmitter();

const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryContent(`project/${route.params.slug}`).findOne()
);

useSeoHead({ title: project.value.title });

const projectPage = ref(null);

const showBackButton = () =>
  gsap.to('.nav__back-link', { autoAlpha: 1, delay: 0.7 });

onMounted(() => {
  gsap.set('.nav__back-link', { autoAlpha: 0 });

  imagesLoaded(projectPage.value, () => emitter.emit('images:loaded'));
});

emitter.once('overlay:hiding', showBackButton);
</script>

<template>
  <div ref="projectPage" class="projects-page">
    <ContentDoc />
  </div>
</template>

<style lang="scss">
.projects-page {
  min-height: 100vh;
}
</style>
