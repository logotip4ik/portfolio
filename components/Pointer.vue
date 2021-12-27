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

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    this.$gsap.set(pointer, {
      x: centerX,
      y: centerY,
      xPercent: -50,
      yPercent: -50,
    })

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

        this.$gsap.to(el, {
          x,
          y,
          xPercent: -50,
          yPercent: -50,
          duration: 0.4,
          ease: 'power2.out(1.5)',
        })
      }
    },
  },
}
</script>

<style lang="scss">
.pointer {
  --pointer-size: 4.5rem;

  position: fixed;
  z-index: 9;

  height: var(--pointer-size);
  width: var(--pointer-size);

  background-color: var(--ff-primary-color);
  border-radius: 50%;
  opacity: 0;

  pointer-events: none;
  mix-blend-mode: difference;

  &.shown {
    opacity: 1;
  }
}
</style>
