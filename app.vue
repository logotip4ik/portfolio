<script setup>
const route = useRoute();
const { $smoothScroll, ...nuxtApp } = useNuxtApp();
const { gsap, ScrollTrigger } = useGsap();
const emitter = useEmitter();
const currentRoute = useCurrentRoute();

nuxtApp.hook('page:finish', () => emitter.emit('shader:start'));

const isRouteChanging = ref(false);

function leavePageAnim(pageEl, done) {
  isRouteChanging.value = true;

  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onStart: () => {
      $smoothScroll.disable();
    },
  });

  tl.to(pageEl, { y: -200, duration: 1 }, 0);
  tl.fromTo(
    '.page-overlay__slide',
    {
      opacity: 1,
      pointerEvents: 'all',
      yPercent: 15,
      clipPath: 'inset(85% 0% 0% 0%)',
    },
    {
      yPercent: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      stagger: { each: 0.1 },
      duration: 0.75,
      onComplete: () => {
        // need to set this myself because the route changes faster then overlay is hiding the page
        currentRoute.value = route.name;

        $smoothScroll.scrollTo(0, 0);
      },
    },
    0
  );
  tl.fromTo(
    '.page-overlay__slide__text',
    { yPercent: 105, autoAlpha: 1 },
    { yPercent: 0, onComplete: () => done(), ease: 'expo.out' },
    0.25
  );
}

function enterPageAnim(pageEl, done) {
  isRouteChanging.value = true;

  const tl = gsap.timeline({
    delay: 0.15,
    defaults: { ease: 'expo.out' },
    paused: true,
    onStart: () => {
      isRouteChanging.value = false;
      emitter.emit('pointer:inactive');

      const waitFor = 0.75;
      const emitAt = (tl.totalDuration() - waitFor) * 1000;
      // For index page (especially going from project to index)
      // refreshing time with delay messes the footer animation
      const refreshAt =
        route.name === 'index'
          ? tl.totalDuration() * 1000
          : (tl.totalDuration() - waitFor - 0.175) * 1000;

      setTimeout(() => emitter.emit('overlay:hiding'), emitAt);
      setTimeout(() => {
        ScrollTrigger.refresh();

        $smoothScroll.enable();

        // removes transform: matrix, so navbar has correct z-index ¯\_(ツ)_/¯
        gsap.set('#scroller', { clearProps: 'all' });
      }, refreshAt);
    },
    onComplete: () => {
      done();

      // when user was scrolling down, the nav will be hidden, but
      // on a new page the nav should be visible
      gsap.to('.nav', { autoAlpha: 1 });
    },
  });

  tl.fromTo(pageEl, { y: 200 }, { y: 0, duration: 1, clearProps: 'y' }, 0.2);
  tl.fromTo(
    '.page-overlay__slide',
    {
      opacity: 1,
      pointerEvents: 'all',
      yPercent: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
    },
    {
      yPercent: -15,
      clipPath: 'inset(0% 0% 85% 0%)',
      stagger: { each: 0.1, from: 'end' },
      duration: 0.75,
    },
    0.2
  );
  tl.fromTo(
    '.page-overlay__slide__text',
    { yPercent: 0, autoAlpha: 1 },
    { yPercent: -125, ease: 'expo.out' },
    0
  );

  emitter.once('images:loaded', () => tl.play());
}

function setVh() {
  const windowHeight = window.innerHeight;
  document.documentElement.setAttribute(
    'style',
    `--vh: ${windowHeight / 100}px`
  );
}

function logGreeting() {
  // eslint-disable-next-line
  console.log(
    '%cBogdan Kostyuk',
    'background-color: #030303;border-radius: 0.125rem;padding: 5px 10px;font-family: "Arial", sans-serif;font-size: 2rem;color: white'
  );
  // eslint-disable-next-line
  console.log(
    "%cHello😁 curios friend! Currently I am looking👀 for a job as a front end developer, so let's get in touch! If you are looking for a source📦 here you are: https://github.com/logotip4ik/portfolio",
    'background-color: #030303;border-radius: 0.125rem;padding: 5px 10px;font-size:1rem;color: white;line-height:1.75'
  );
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

onMounted(() => {
  $smoothScroll.disable();

  logGreeting();
  setVh();
  showFlagStripes();

  if (route.name === 'index')
    gsap.set('.page-overlay__slide', {
      opacity: 0,
      pointerEvents: 'none',
      onComplete: () => $smoothScroll.enable(),
    });

  if (route.name !== 'index') {
    gsap.set('.loader', { autoAlpha: 0, display: 'none' });

    gsap.fromTo(
      '.page-overlay__slide__text',
      { yPercent: 105, autoAlpha: 1 },
      { yPercent: 0, delay: 0.075, ease: 'expo.out' }
    );

    enterPageAnim('#scroller', () => null);
  }

  window.addEventListener('resize', setVh);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setVh);
});
</script>

<template>
  <div>
    <div id="scroller">
      <VNavbar />
      <Transition
        :css="false"
        mode="out-in"
        @enter="enterPageAnim"
        @leave="leavePageAnim"
      >
        <div :key="route.name + route.params.slug">
          <KeepAlive>
            <NuxtPage />
          </KeepAlive>
        </div>
      </Transition>
    </div>

    <VPointer />
    <VLoader />
    <UkraineFlagStripe />
    <VOverlay :is-route-changing="isRouteChanging" />
  </div>
</template>
