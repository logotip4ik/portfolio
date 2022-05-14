<script setup>
const { $smoothScroll } = useNuxtApp();
const { gsap, ScrollTrigger } = useGsap();

const currentSection = useCurrentSection();

onMounted(() => {
  $smoothScroll.disable();

  // website parts, heading, sections and footer
  const parts = gsap.utils.toArray('header, section, footer');

  parts.forEach((part, key) => {
    ScrollTrigger.create({
      trigger: part,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => (currentSection.value = key),
      onEnterBack: () => (currentSection.value = key),
    });
  });
});
</script>

<template>
  <div>
    <VNavbar />
    <div class="smooth-scroll-fix">
      <VHeader />
      <main>
        <VProjects />
        <VAboutMe />
        <VContact />
      </main>
    </div>
    <VFooter />
    <VMenu />
  </div>
</template>

<style>
.smooth-scroll-fix {
  position: relative;
  z-index: 3;
  pointer-events: none;
}
</style>
