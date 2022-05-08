<script setup>
const { gsap } = useGsap();

let firstMove = false;

const pointer = ref(null);

onMounted(() => {
  gsap.set(pointer.value, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    autoAlpha: 0,
  });

  const isTouch = 'ontouchstart' in document.documentElement;

  if (isTouch) return;

  const toPointerX = gsap.quickTo(pointer.value, 'x', {
    ease: 'expo.out',
    duration: 0.5,
  });
  const toPointerY = gsap.quickTo(pointer.value, 'y', {
    ease: 'expo.out',
    duration: 0.5,
  });

  window.addEventListener('pointermove', ({ x, y }) => {
    if (!firstMove)
      gsap.to(pointer.value, { autoAlpha: 1 }).then(() => (firstMove = true));

    toPointerX(x);
    toPointerY(y);
  });
});
</script>

<template>
  <div ref="pointer" class="pointer"></div>
</template>

<style lang="scss">
.pointer {
  --size: 1rem;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  width: var(--size);
  height: var(--size);

  border-radius: 50%;
  background-color: #ffe6ed;

  mix-blend-mode: exclusion;

  pointer-events: none;
  transform: translate(-50%, -50%);
}
</style>
