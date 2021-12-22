<template>
  <section ref="project" class="projects">
    <h2 class="projects__title">
      / Projects <span ref="projectTitleCover" class="cover"></span>
    </h2>
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
  mounted() {
    const gsap = this.$gsap

    const { projectTitleCover, project } = this.$refs

    gsap.to(projectTitleCover, {
      top: '100%',
      duration: 0.65,
      scrollTrigger: {
        trigger: projectTitleCover.parentElement,
        start: 'top bottom-=100px',
      },
    })
    gsap.fromTo(
      projectTitleCover.parentElement,
      { y: -20 },
      {
        y: 20,
        duration: 0.65,
        scrollTrigger: {
          trigger: project,
          scrub: 1,
        },
      }
    )
  },
}
</script>

<style lang="scss">
.projects {
  position: relative;
  isolation: isolate;

  padding: 0 var(--pd-x) 6rem;

  &__title {
    display: inline-block;

    position: relative;

    font-weight: 500;
    font-size: clamp(1.25rem, 5vw, 2.25rem);
    margin-bottom: 3rem;

    .cover {
      position: absolute;
      top: 0%;
      left: 0;
      right: 0;
      bottom: 0%;

      background-color: var(--ff-primary-color);
    }
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
