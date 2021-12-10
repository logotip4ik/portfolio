<template>
  <div class="main">
    <h1 ref="heading" class="main__heading">Projects</h1>

    <hr class="main__hr" />

    <ul class="main__projects">
      <li
        v-for="project in projects"
        :key="project.slug"
        class="main__projects__project"
        tabindex="0"
      >
        <NuxtLink
          :to="project.path"
          tag="h2"
          class="main__projects__project__name"
          tabindex="0"
        >
          {{ project.name }}
        </NuxtLink>
        <p class="main__projects__project__description">
          {{ project.description }}
        </p>

        <ul class="main__projects__project__links">
          <a :href="project.live" target="_blank" rel="noopener noreferrer">
            Live
          </a>
          <a :href="project.source" target="_blank" rel="noopener noreferrer">
            Source
          </a>
        </ul>
      </li>
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
  },
}
</script>

<style lang="scss">
.main {
  &__heading {
    margin-bottom: 0.5rem;
  }

  &__hr {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
