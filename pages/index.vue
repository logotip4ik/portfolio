<script setup>
const { $smoothScroll } = useNuxtApp();

onMounted(() => {
  $smoothScroll.disable();
});
</script>

<template>
  <div>
    <div class="smooth-scroll-fix">
      <VHeader />
      <main>
        <VProjects />
        <VAboutMe />
        <VContact />
      </main>
    </div>
    <VFooter />
  </div>
</template>

<style>
.smooth-scroll-fix {
  position: relative;
  z-index: 3;
  pointer-events: none;
}
</style>
