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

    const readTime = 0.175
    const { loader, loaderWord1Chars } = this.$refs
    const loaderChildren = Array.from(loader.children)

    const gsap = this.$gsap

    const tl = gsap.timeline({
      delay: 0.6,
      paused: false,
      defaults: { duration: 0.65, ease: 'power1.out' },
    })

    tl.set(loaderChildren, { scale: 1.125, opacity: 0, filter: 'blur(0px)' })

    for (let i = 0; i < loaderChildren.length; i++) {
      const loaderChild = loaderChildren[i]

      if (i === 0) {
        tl.set(loaderChild, { opacity: 1 })
        tl.fromTo(
          loaderWord1Chars,
          { yPercent: 100, color: '#000' },
          {
            yPercent: 0,
            color: '#fff',
            ease: 'power3.out',
            stagger: { each: 0.05 },
          }
        )
      } else tl.to(loaderChild, { scale: 1, opacity: 1 }, '-=0.125')

      tl.to(
        loaderChild,
        { scale: 0.9, opacity: 0, filter: 'blur(5px)' },
        `+=${readTime}`
      )
    }

    tl.to(loader, {
      opacity: 0,
      onStart: () => {
        this.$enableScrollY()
      },
      onEnd: () => {
        this.$nuxt.$emit('show-shader')
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
  z-index: 5;

  width: 100%;
  height: 100%;
  max-width: 100vw;

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
