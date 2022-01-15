<template>
  <div ref="loader" class="loader">
    <p class="loader__word">
      <span
        v-for="(char, key) in firstWord"
        :key="key"
        ref="loaderWord1Chars"
        class="loader__word__char"
        >{{ char }}</span
      >
    </p>
    <p class="loader__word">and Welcome.</p>
    <p class="loader__word loader__word--logo serif">BK</p>
  </div>
</template>

<script>
export default {
  data: () => ({ firstWord: 'Hello' }),
  mounted() {
    this.$disableScrollY()

    const readTime = 0.4
    const { loader, loaderWord1Chars } = this.$refs
    const loaderChildren = Array.from(loader.children)

    const gsap = this.$gsap

    const tl = gsap.timeline({
      delay: 0.6,
      paused: false,
      defaults: { duration: 0.75, ease: 'power1.inOut' },
    })

    tl.set(loaderChildren, { scale: 1.2, opacity: 0, filter: 'blur(0px)' })

    for (let i = 0; i < loaderChildren.length; i++) {
      const loaderChild = loaderChildren[i]

      if (i === 0) {
        tl.set(loaderChild, { opacity: 1 })
        tl.fromTo(
          loaderWord1Chars,
          { yPercent: 100 },
          { yPercent: 0, ease: 'power3.out', stagger: { amount: 0.1 } }
        )
      } else tl.to(loaderChild, { scale: 1, opacity: 1 })

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
    line-height: 1.125;

    margin: 0;
    opacity: 0;

    overflow: hidden;
    transform: translate(-50%, -50%);

    &__char {
      display: inline-block;
    }

    &--logo {
      font-size: var(--step-4);
    }
  }
}
</style>
