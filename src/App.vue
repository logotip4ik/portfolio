<template>
  <v-navbar @scroll-to="scroll"></v-navbar>
  <div class="top"></div>
  <v-heading @scroll-to="scroll"></v-heading>
  <v-projects></v-projects>
  <v-about-me></v-about-me>
  <v-contact></v-contact>
</template>

<script>
import VueScrollTo from 'vue-scrollto';

import VHeading from './components/V-Heading.vue';
import VNavbar from './components/V-Navbar.vue';
import VProjects from './components/V-Projects.vue';
import VAboutMe from './components/V-AboutMe.vue';
import VContact from './components/V-Contact.vue';

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
    VAboutMe,
    VContact,
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
  scroll-behavior: smooth;

  *::selection {
    background-color: rgba($color: #79ffe1, $alpha: 0.7);
  }
}
</style>
