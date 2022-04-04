<template>
  <div ref="pointer" class="pointer">
    <ArrowLink
      ref="pointerArrow"
      aria-label="arrow for indicating link"
      class="pointer__arrow"
    ></ArrowLink>
  </div>
</template>

<script>
import ArrowLink from '~/assets/img/arrow-link.svg?inline'

export default {
  components: { ArrowLink },
  data: () => ({ isPointerInWindow: true, isHovering: false }),
  watch: {
    isPointerInWindow(val) {
      if (val) this.$refs.pointer.classList.remove('pointer--hidden')
      else this.$refs.pointer.classList.add('pointer--hidden')
    },
    isHovering(val) {
      const duration = 0.3
      const ease = 'back.out'

      const hoveringSize = 7
      const idleSize = 1

      if (val) {
        this.$gsap.to(this.$refs.pointer, {
          scale: hoveringSize,
          duration,
          ease,
        })
        this.$gsap.fromTo(
          this.$refs.pointerArrow,
          { scale: 0, rotate: 0 },
          { scale: 1, rotate: -45, delay: 0.075, duration, ease }
        )
      } else {
        this.$gsap.to(this.$refs.pointer, { scale: idleSize, duration, ease })
        this.$gsap.to(this.$refs.pointerArrow, { scale: 0, duration, ease })
      }
    },
  },
  mounted() {
    const prefersReducedMotion = this.$prefersReducedMotion()

    if ('ontouchstart' in document.documentElement || prefersReducedMotion)
      return

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

    this.$nuxt.$on('toggle-hovering', (val) => {
      if (typeof val === 'boolean') this.isHovering = val
      else this.isHovering = !this.isHovering
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
      const pointerSize = this.$gsap.getProperty(this.$refs.pointer, 'width')

      const x = clientX - window.innerWidth / 2 - pointerSize / 2
      const y = clientY - window.innerHeight / 2 - pointerSize / 2

      this.$gsap.to(this.$refs.pointer, {
        x,
        y,
        opacity: this.isPointerInWindow ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out(1.5)',
      })
    },
  },
}
</script>

<style lang="scss">
.pointer {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 100;

  width: 12px;
  height: 12px;

  top: 50%;
  left: 50%;

  opacity: 0;
  border-radius: 50%;
  background-color: #ffe6ed;

  visibility: hidden;
  pointer-events: none;

  mix-blend-mode: exclusion;

  transition: opacity 300ms;
  transform-origin: center center;

  &__arrow {
    width: 22.5%;
    height: auto;

    color: black;

    transform: scale(0);
    transform-origin: center center;
  }

  &--hidden {
    opacity: 0 !important;
  }
}
</style>

