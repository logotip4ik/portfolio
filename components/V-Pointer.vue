<template>
  <div ref="pointer" class="pointer" :style="{ '--size': `${pointerSize}px` }">
    <!-- TODO: add arrow svg, for link animations -->
  </div>
</template>

<script>
export default {
  data: () => ({ pointerSize: 12 }),
  mounted() {
    const { pointer } = this.$refs

    const gsap = this.$gsap

    this.$nuxt.$on('show-layout', () => {
      gsap.to(pointer, {
        delay: 1,
        autoAlpha: 1,
        onEnd: () => {
          window.addEventListener('pointermove', (ev) => {
            const x = ev.clientX - window.innerWidth / 2 - this.pointerSize / 2
            const y = ev.clientY - window.innerHeight / 2 - this.pointerSize / 2
            gsap.to(pointer, { x, y, duration: 1, ease: 'expo.out' })
          })
        },
      })
    })
  },
}
</script>

<style lang="scss">
.pointer {
  --size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 100;

  width: var(--size);
  height: var(--size);

  top: 50%;
  left: 50%;

  opacity: 0;
  border-radius: 50%;
  background-color: #ffe6ed;

  visibility: hidden;
  pointer-events: none;

  mix-blend-mode: exclusion;
}
</style>
