<script setup>
const { gsap } = useGsap();
const route = useRoute();

const overlay = shallowRef({});

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

function disableScrollRestoration() {
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
}

onMounted(() => {
  setVh();
  showFlagStripes();
  disableScrollRestoration();

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
    <div page-content :key="$route.fullPath">
      <NuxtPage />
    </div>
  </Transition>

  <VPointer />
  <VLoader />
  <VOverlay ref="overlay" />
</template>
