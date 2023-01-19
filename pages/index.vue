<script setup>
import imagesLoaded from 'imagesloaded';

const { data: projects } = await useAsyncData('prerender-projects', () =>
  queryContent('project').only(['_path']).find()
);

useSeoHead({
  title: 'Front End Developer',
  description: 'Perfection hides in details',
  links: [
    ...projects.value.map(({ _path }) => ({ rel: 'prerender', href: _path })),
  ],
});

const { gsap, ScrollTrigger } = useGsap();
const emitter = useEmitter();
const currentSection = useCurrentSection();

const indexPage = ref(null);

onMounted(() => {
  imagesLoaded(indexPage.value, () => emitter.emit('images:loaded'));
  
  // website parts, heading, sections and footer
  const parts = gsap.utils.toArray('header, section');
  
  const triggers = [];

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

  gsap.set(window, { scrollTo: { y: 0 }})

  onBeforeUnmount(() => {
    triggers.forEach((trigger) => trigger.kill());
  });
});
</script>

<template>
  <div ref="indexPage">
    <div class="smooth-scroll-fix">
      <VHeader />
      <main>
        <VProjects />
        <VAboutMe />
        <VContact />
      </main>
    </div>
    <VFooter />

    <Teleport to="body">
      <VMenu />
    </Teleport>
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
