<template>
  <div class="main">
    <h1 ref="heading" class="main__heading">Projects</h1>

    <hr class="main__hr" />

    <ul ref="projects" class="main__projects">
      <ProjectItem
        v-for="i in 4"
        :key="i"
        :project="projects[0]"
        class="main__projects__project"
      />
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  async asyncData({ $content }) {
    const projects = await $content('projects').fetch()

    return { projects }
  },
  mounted() {
    gsap.fromTo(this.$refs.heading, { y: 20, opacity: 0 }, { y: 0, opacity: 1 })

    gsap.fromTo(
      this.$refs.projects.children,
      { opacity: 0 },
      { opacity: 1, stagger: 0.05, delay: 0.15 }
    )
  },
}
</script>

<style lang="scss">
.main {
  &__heading {
    margin-bottom: 0.5rem;
  }

  &__hr {
    margin-bottom: 2rem;
  }

  &__projects {
    display: flex;
    flex-direction: column;

    list-style-type: none;

    &__project:not(:first-of-type) {
      border-top: 1px solid rgba($color: #ccc, $alpha: 0.25);
    }
  }
}
</style>
