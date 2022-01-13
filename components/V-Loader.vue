<template>
  <div ref="loader" class="loader">
    <p class="loader__word">Hello</p>
    <p class="loader__word">and Welcome.</p>
    <p class="loader__word loader__word--logo serif">BK</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$disableScrollY()

    const readTime = 0.25
    const { loader } = this.$refs
    const loaderChildren = Array.from(loader.children)

    const gsap = this.$gsap

    const tl = gsap.timeline({
      delay: 0.5,
      paused: false,
      defaults: { duration: 0.65 },
    })

    tl.set(loaderChildren, { scale: 1.2, opacity: 0, filter: 'blur(0px)' })

    for (const loaderChild of loaderChildren) {
      tl.to(loaderChild, { scale: 1, opacity: 1 })
      tl.to(
        loaderChild,
        { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
        `+=${readTime}`
      )
    }

    tl.to(loader, {
      opacity: 0,
      onStart: () => {
        this.$enableScrollY()
      },
      onEnd: () => {
        this.$nuxt.$emit('show-circle')
        this.$nuxt.$emit('show-layout')
      },
    })
    tl.set(loader, { display: 'none' })
  },
}
</script>

<style lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;

  color: #dfdfdf;
  background-color: var(--black-color);

  &__word {
    position: absolute;
    top: 50%;
    left: 50%;

    font-size: var(--step-2);

    margin: 0;
    opacity: 0;

    transform: translate(-50%, -50%);

    &--logo {
      font-size: var(--step-4);
    }
  }
}
</style>
