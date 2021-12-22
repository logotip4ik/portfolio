<template>
  <section class="projects">
    <h2 class="projects__title">/ Projects</h2>
    <ul class="projects__list">
      <ProjectItem v-for="key in 3" :key="key" />
    </ul>
  </section>
</template>

<script>
export default {
  name: 'SectionProjects',
}
</script>

<style lang="scss">
.projects {
  padding: 0 var(--pd-x);

  &__title {
    font-weight: 500;
    font-size: clamp(1.25rem, 5vw, 2.125rem);
    margin-bottom: 3rem;
  }

  &__list {
    padding-left: clamp(1rem, 5vw, 3rem);
  }
}
</style>
