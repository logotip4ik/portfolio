<template>
  <div class="main">
    <h1 ref="heading" class="main__heading">Projects</h1>

    <hr class="main__hr" />

    <ul ref="projects" class="main__projects">
      <ProjectItem
        v-for="project in projects"
        :key="project.slug"
        :project="project"
        class="main__projects__project"
      />
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  async asyncData({ $content }) {
    const projects = await $content('projects')
      .only(['name', 'description'])
      .fetch()

    return { projects }
  },
  head: {
    title: 'Projects | Bogdan Kostyuk',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Here you can find all my projects that I am proud of, learned something or was just fun to create',
      },
    ],
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
