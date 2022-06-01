<script setup>
const route = useRoute();
const { data: project } = await useAsyncData(
  `project-${route.params.slug}`,
  () => queryContent(`projects/${route.params.slug}`).findOne()
);

useSeoHead({ title: project.value.title });
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
