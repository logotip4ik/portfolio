<script setup>
const route = useRoute();
const { $smoothScroll, ...nuxtApp } = useNuxtApp();
const { gsap } = useGsap();
const emitter = useEmitter();

nuxtApp.hook('page:start', () => emitter.emit('pointer:inactive'));
nuxtApp.hook('page:finish', () => {
  emitter.emit('shader:start');
  setTimeout($smoothScroll.update, 50);
});

function leavePageAnim(el, done) {
  gsap.to(el, { opacity: 0, onComplete: () => done() });
}

function enterPageAnim(el, done) {
  gsap.to(el, {
    opacity: 1,
    onComplete: () => {
      done();
      $smoothScroll.update();
    },
  });
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
    'background-color: #030303;border-radius: 0.125rem;padding: 5px 10px;font-family: "Times New Roman", serif;font-size: 2rem;color: white'
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
    delay: route.name === 'index' ? 3 : 0.25,
  });
}

onMounted(() => {
  logGreeting();
  setVh();
  showFlagStripes();

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
        <div :key="$route.name">
          <NuxtPage />
        </div>
      </Transition>
    </div>

    <VPointer />
    <VLoader />
    <UkraineFlagStripe />
  </div>
</template>
