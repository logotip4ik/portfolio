<script setup>
const route = useRoute();
const { gsap } = useGsap();
const { base } = useRuntimeConfig().public;

const overlay = shallowRef({});

const projectSlug = computed(() => route.params.slug ?? '');
const currentURL = computed(() =>
  projectSlug.value ? `${base}/project/${projectSlug.value}` : base
);
const ogImageUrl = computed(() =>
  projectSlug.value
    ? `${base}/img/${projectSlug.value}-logo.webp`
    : `${base}/logo.png`
);

function setVh() {
  const windowHeight = window.innerHeight;

  gsap.set(document.documentElement, { '--vh': `${windowHeight / 100}px` });
}

function showFlagStripes() {
  gsap.from('.flag-stripe__line', {
    xPercent: -25,
    stagger: 0.125,
    ease: 'expo.out',
    duration: 1.5,
    delay: route.name === 'index' ? 3 : 1,
  });
}

useHead({
  meta: [
    { property: 'url', name: 'url', content: () => currentURL.value },
    { property: 'og:url', name: 'og:url', content: () => currentURL.value },
    { property: 'og:image', name: 'og:image', content: () => ogImageUrl.value },
  ],
  link: [{ rel: 'canonical', href: () => `${currentURL.value}/` }],
});

onMounted(() => {
  setVh();
  showFlagStripes();

  if (route.name !== 'index')
    overlay.value.enterPageAnim('div[page-content]', () => null);

  window.addEventListener('resize', setVh);

  window.requestIdleCallback(() =>
    import('~/lib/greeting').then((module) => module.logGreeting())
  );
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setVh);
});
</script>

<template>
  <VNavbar />
  <UkraineFlagStripe />

  <Transition
    :css="false"
    mode="out-in"
    @enter="overlay.enterPageAnim"
    @leave="overlay.leavePageAnim"
  >
    <div page-content :key="route.fullPath">
      <NuxtPage />
    </div>
  </Transition>

  <VPointer />
  <VLoader />
  <VOverlay ref="overlay" />
</template>
