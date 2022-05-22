<script setup>
const { $smoothScroll, ...nuxtApp } = useNuxtApp();
const emitter = useEmitter();

nuxtApp.hook('page:start', () => emitter.emit('pointer:inactive'));
nuxtApp.hook('page:finish', () => setTimeout($smoothScroll.update, 50));

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

onMounted(() => {
  logGreeting();
  setVh();

  window.addEventListener('resize', setVh);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setVh);
});
</script>

<template>
  <div>
    <div id="scroller">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <VPointer />
    <VLoader />
  </div>
</template>
