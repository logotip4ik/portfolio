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

onMounted(() => {
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
