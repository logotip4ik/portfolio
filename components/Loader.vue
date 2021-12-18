<template>
  <div ref="loader" class="loader">
    <p class="loader__text">
      <span
        v-for="(word, key) in words"
        :key="key"
        ref="loaderWords"
        class="loader__text__word"
      >
        {{ word }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    words: ['Bogdan ', 'Kostyuk'],
  }),
  mounted() {
    const { loader, loaderWords } = this.$refs

    const gsap = this.$gsap
    const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power1.out' } })

    tl.set(loaderWords, { yPercent: 100, opacity: 1 })
    tl.to(loaderWords, { yPercent: 0, stagger: 0.075 })
    tl.to(loaderWords, { yPercent: -110, stagger: 0.075 })
    tl.fromTo(
      loader,
      { filter: 'blur(0px)', opacity: 1 },
      { filter: 'blur(100px)', opacity: 0, duration: 1 }
    )
    tl.set(loader, {
      duration: 0,
      display: 'none',
      onComplete: () => (document.body.dataset.initialLoaded = true),
    })
  },
}
</script>

<style lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  background-color: var(--surface-color);

  transition: background-color var(--transition-time)
    var(--transition-function-ease-out);

  &__text {
    font-family: 'Merriweather', serif;
    font-size: calc(2.5rem + 0.33vw);

    overflow: hidden;

    &__word {
      display: inline-block;

      opacity: 0;

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
}
</style>
