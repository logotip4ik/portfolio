<template>
  <v-navbar @scroll-to="scroll"></v-navbar>
  <div class="top"></div>
  <v-heading @scroll-to="scroll"></v-heading>
  <v-projects></v-projects>
</template>

<script>
import VueScrollTo from 'vue-scrollto';

import VHeading from './components/V-Heading.vue';
import VNavbar from './components/V-Navbar.vue';
import VProjects from './components/V-Projects.vue';

export default {
  name: 'App',
  setup() {
    function scroll(target) {
      VueScrollTo.scrollTo(`.${target}`, 1000, {
        offset: -60,
        cancelable: true,
      });
    }

    return { scroll };
  },
  components: {
    VNavbar,
    VHeading,
    VProjects,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');
*,
:before,
:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  *::selection {
    background-color: rgba($color: #79ffe1, $alpha: 0.7);
  }
}
</style>
