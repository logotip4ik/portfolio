<template>
  <v-navbar></v-navbar>
</template>

<script>
import VNavbar from './components/V-Navbar.vue';

export default {
  name: 'App',
  components: {
    VNavbar,
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
