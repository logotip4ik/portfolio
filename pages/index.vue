<script setup>
useSeoHead({
  title: 'Front End Developer',
  description:
    'I will build you website as quick as possible and with high attention to details👌',
});

const { gsap, ScrollTrigger } = useGsap();

const currentSection = useCurrentSection();

onMounted(() => {
  const triggers = [];

  // website parts, heading, sections and footer
  const parts = gsap.utils.toArray('header, section');

  parts.forEach((part, key) => {
    triggers.push(
      ScrollTrigger.create({
        trigger: part,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => (currentSection.value = key),
        onEnterBack: () => (currentSection.value = key),
      })
    );
  });

  onBeforeUnmount(() => {
    triggers.forEach((trigger) => trigger.kill());
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
  @media screen and (max-width: 1024px) {
    position: relative;
    z-index: 5;

    pointer-events: all;
  }
}
</style>
