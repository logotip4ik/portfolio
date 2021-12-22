<template>
  <section class="projects">
    <h2 class="projects__title">/ Projects</h2>
    <ul class="projects__list">
      <ProjectItem v-for="key in 3" :key="key" />
    </ul>

    <img
      src="/img/blob-2.png"
      alt="floating blob"
      class="projects__blob parallax-blob"
    />
  </section>
</template>

<script>
export default {
  name: 'SectionProjects',
}
</script>

<style lang="scss">
.projects {
  position: relative;
  isolation: isolate;

  padding: 0 var(--pd-x);

  &__title {
    font-weight: 500;
    font-size: clamp(1.25rem, 5vw, 2.25rem);
    margin-bottom: 3rem;
  }

  &__list {
    padding-left: clamp(1rem, 5vw, 3rem);
  }

  &__blob {
    position: absolute;
    top: 35%;
    left: 0;
    z-index: -1;

    width: clamp(10rem, 25vw, 35rem);
    height: auto;

    filter: blur(35px);
  }
}
</style>
