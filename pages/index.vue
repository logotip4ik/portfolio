<script setup>
const { data: projects } = await useAsyncData('prerender-projects', () =>
  queryContent('project').only(['_path']).find()
);

if (process.server) {
  useHead({ htmlAttrs: { 'data-index-page': true } }, { mode: 'server' });
}

useHead({
  title: 'Front End Developer',
  meta: [
    { property: 'og:title', name: 'og:title', content: 'Front End Developer' },
    { name: 'description', content: 'Perfection hides in details' },
    {
      property: 'og:description',
      name: 'og:description',
      content: 'Perfection hides in details',
    },
  ],

  links: [
    ...projects.value.map(({ _path }) => ({ rel: 'prerender', href: _path })),
  ],
});

const { gsap, ScrollTrigger } = useGsap();
const emitter = useEmitter();
const currentSection = useCurrentSection();

const indexPage = ref(null);

onMounted(() => {
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

  onBeforeUnmount(() => {
    triggers.forEach((trigger) => trigger.kill());
  });
});

useImagesLoaded(indexPage, () => emitter.emit('images:loaded'));
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
[data-index-page] .page-overlay__slide {
  opacity: 0;
  pointer-events: none;
}

.smooth-scroll-fix {
  @media screen and (max-width: 1024px) {
    position: relative;
    z-index: 4;

    pointer-events: all;
  }
}
</style>
