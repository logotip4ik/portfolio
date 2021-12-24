<template>
  <div ref="pointer" class="pointer" aria-hidden="true"></div>
</template>

<script>
export default {
  name: 'PointerComponent',
  data: () => ({
    pointerMover: null,
  }),
  mounted() {
    const isMobile = 'ontouchstart' in document.documentElement

    if (isMobile) return

    const { pointer } = this.$refs

    this.$gsap.set(pointer, { x: window.innerWidth / 2, y: innerHeight / 2 })

    this.pointerMover = this.pointerMoverFactory(pointer)

    window.addEventListener('mousemove', this.pointerMover)
  },
  beforeUpdate() {
    window.removeEventListener('mousemove', this.pointerMover)
  },
  methods: {
    pointerMoverFactory(el) {
      let isPointerHidden = true

      return ({ x, y }) => {
        if (isPointerHidden) {
          el.classList.add('shown')
          isPointerHidden = true
        }

        this.$gsap.to(el, { x, y, ease: 'sine.out' })
      }
    },
  },
}
</script>

<style lang="scss">
.pointer {
  --pointer-size: 4rem;

  position: fixed;
  z-index: 9;

  height: var(--pointer-size);
  width: var(--pointer-size);

  background-color: var(--surface-color);
  border-radius: 50%;
  opacity: 0;

  pointer-events: none;
  filter: invert(1);
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: opacity 500ms ease-out;

  &.shown {
    opacity: 1;
  }
}
</style>
