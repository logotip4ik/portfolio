<template>
  <section class="projects">
    <h2 data-nosnippet>Projects</h2>
    <div class="container">
      <v-projects-card
        v-for="(project, idx) in projects"
        :key="idx"
        :project="project"
      ></v-projects-card>
    </div>
  </section>
</template>

<script>
import projects from '../projects';

import VProjectsCard from './V-Projects-Card.vue';

export default {
  name: 'Projects',
  setup() {
    return {
      projects,
    };
  },
  components: { VProjectsCard },
};
</script>

<style lang="scss" scoped>
.projects {
  min-height: 100vh;
  padding: 1rem 0.75rem;

  h2 {
    text-align: center;
    font-size: 2rem;
  }

  .container {
    margin: 0 auto;
    max-width: 1400px;
    padding: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}
</style>
