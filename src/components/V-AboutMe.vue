<template>
  <section class="about-me">
    <h2>About Me</h2>
    <h3 class="name">My Name <span class="thin">Bogdan Kostyuk</span></h3>
    <p>
      I am self thought young developer. My known languages are: JavaScript, Node.js, Vue.js,
      Python, TypeScript, Html and Css. My main place to develop is Linux, so I have a good
      experience with bash. Of course I am using git and Github. I love creating useful or just
      funny things and I do it with passion.
    </p>
    <h3 class="tech">Tech I am using</h3>
    <div class="container">
      <font-awesome-icon
        v-for="(icon, idx) in icons"
        :icon="['fab', icon]"
        :key="idx"
        size="6x"
      ></font-awesome-icon>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'About Me',
  setup() {
    const icons = ref([
      'js',
      'html5',
      'css3',
      'vuejs',
      'python',
      'linux',
      'windows',
      'git',
      'github',
    ]);

    return {
      icons,
    };
  },
};
</script>

<style lang="scss" scoped>
.about-me {
  min-height: 100vh;
  padding: 1rem 0.75rem;
  background: #18181e;
  color: white;
  box-shadow: 0 0 10px 4px rgba($color: #000000, $alpha: 0.5);
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 7rem;
  }
  .name {
    font-size: 1.5rem;
    color: rgb(230, 230, 230);
    letter-spacing: 1px;
    margin-bottom: 1rem;
    font-weight: 200;

    .thin {
      font-weight: normal;
    }
  }
  p {
    max-width: 600px;
    margin: 0 auto;
    line-height: 2;
    color: rgb(201, 201, 201);
    margin-bottom: 7rem;
  }
  .tech {
    font-size: 1.5rem;
    color: rgb(230, 230, 230);
    letter-spacing: 1px;
    margin-bottom: 1rem;
  }
  .container {
    width: 95vw;
    margin: 0 auto;
    margin-bottom: 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    * {
      margin: 1rem;
    }
  }
}
</style>
