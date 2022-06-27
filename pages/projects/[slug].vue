<script setup>
import imagesLoaded from 'imagesloaded';

const route = useRoute();

const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryContent(`projects/${route.params.slug}`).findOne()
);

const projectPage = ref(null);

const { gsap, ScrollTrigger } = useGsap();
const emitter = useEmitter();

useSeoHead({ title: project.value.title });

const showBackButton = () =>
  gsap.to('.nav__back-link', { autoAlpha: 1, delay: 0.5 });

onMounted(() => {
  gsap.set('.nav__back-link', { autoAlpha: 0 });

  imagesLoaded(projectPage.value, () => ScrollTrigger.refresh());
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
