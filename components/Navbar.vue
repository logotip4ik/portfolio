<template>
  <nav class="nav">
    <NuxtLink to="/projects">Projects</NuxtLink>
    <NuxtLink to="/posts">Blog</NuxtLink>
    <NuxtLink to="#">Contact</NuxtLink>
    <ColorThemeToggle />
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.nav {
  display: grid;
  grid-template-columns: repeat(4, min-content);
  justify-content: end;
  align-items: center;
  gap: 3rem;

  width: 100%;

  padding: 2.5rem 2rem;

  a {
    font-size: 1.5rem;
  }
}
</style>
