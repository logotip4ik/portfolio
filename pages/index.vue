<script setup>
const { $smoothScroll } = useNuxtApp();

onMounted(() => {
  $smoothScroll.disable();
});
</script>

<template>
  <div>
    <VHeader />
    <main>
      <VProjects />
      <section>just some section</section>
      <section>just some section</section>
    </main>
    <footer>just some footer</footer>
  </div>
</template>

<style lang="scss">
header,
section,
footer {
  min-height: 100vh;
}
</style>
