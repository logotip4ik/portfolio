<template>
  <div ref="pointer" class="pointer" :style="{ '--size': `${pointerSize}px` }">
    <!-- TODO: add arrow svg, for link animations -->
  </div>
</template>

<script>
export default {
  data: () => ({
    isPointerInWindow: true,
    pointerSize: 12,
    pointerMoveAnimation: null,
  }),
  watch: {
    isPointerInWindow(val) {
      if (val) this.$refs.pointer.classList.remove('pointer--hidden')
      else this.$refs.pointer.classList.add('pointer--hidden')
    },
  },
  mounted() {
    if ('ontouchstart' in window) return

    const { pointer } = this.$refs

    const gsap = this.$gsap

    this.$nuxt.$on('show-layout', () => {
      gsap.to(pointer, {
        delay: 1,
        autoAlpha: 1,
        onEnd: () => {
          // prettier-ignore
          document.addEventListener('pointermove', this.pointermoveHandler, false)
          // prettier-ignore
          document.addEventListener('pointerover', this.pointeroverHandler, false)
          document.addEventListener('pointerout', this.pointeroutHandler, false)
        },
      })
    })
  },
  methods: {
    pointeroutHandler(ev) {
      // NOTE: taken from: https://stackoverflow.com/a/9229957/12038615
      if (!ev.toElement && !ev.relatedTarget) this.isPointerInWindow = false
    },
    pointeroverHandler() {
      // NOTE: taken from: https://stackoverflow.com/a/1672200/12038615
      if (this.isPointerInWindow) return

      this.isPointerInWindow = true
    },
    pointermoveHandler({ clientX, clientY }) {
      const x = clientX - window.innerWidth / 2 - this.pointerSize / 2
      const y = clientY - window.innerHeight / 2 - this.pointerSize / 2

      this.pointerMoveAnimation = this.$gsap.to(this.$refs.pointer, {
        x,
        y,
        opacity: this.isPointerInWindow ? 1 : 0,
        duration: 1,
        ease: 'expo.out',
      })
    },
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

  transition: opacity 300ms;

  &--hidden {
    opacity: 0 !important;
  }
}
</style>
