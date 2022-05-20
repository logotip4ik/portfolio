<script setup>
const { $smoothScroll, ...nuxtApp } = useNuxtApp();
const emitter = useEmitter();

nuxtApp.hook('page:start', () => emitter.emit('pointer:inactive'));
nuxtApp.hook('page:finish', () => setTimeout($smoothScroll.update, 50));
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
