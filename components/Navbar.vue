<template>
  <nav class="nav">
    <NuxtLink v-for="(route, i) in routes" :key="i" :to="getHref(route.path)">
      {{ route.label }}
    </NuxtLink>
    <ColorThemeToggle />
  </nav>
</template>

<script>
export default {
  data: () => ({
    routes: [
      { label: 'Projects', path: 'projects' },
      { label: 'Blog', path: 'posts' },
      { label: 'Contact', path: 'contact' },
    ],
  }),
  methods: {
    getHref(routeName) {
      if (this.$route.name === routeName) return '/'
      return `/${routeName}`
    },
  },
}
</script>

<style lang="scss">
.nav {
  display: grid;
  grid-template-columns: repeat(4, min-content);
  justify-content: end;
  align-items: center;
  gap: 3rem;

  position: relative;
  z-index: 999999;

  width: 100%;

  padding: 2.5rem 2rem;

  a {
    font-size: 1.5rem;
    margin: 0;
  }
}
</style>
