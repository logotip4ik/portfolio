<script setup>
useSeoHead({
  title: 'Front End Developer',
  description:
    'I will build you website as quick as possible and with high attention to details👌',
});

const { $smoothScroll } = useNuxtApp();
const { gsap, ScrollTrigger } = useGsap();

const currentSection = useCurrentSection();

onMounted(() => {
  $smoothScroll.disable();

  // website parts, heading, sections and footer
  const parts = gsap.utils.toArray('header, section');

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

<style lang="scss">
.smooth-scroll-fix {
  position: relative;
  z-index: 3;
  pointer-events: all;

  @media screen and (min-width: 1024px) {
    pointer-events: none;
  }
}
</style>
