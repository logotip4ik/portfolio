<template>
  <section ref="section" class="about">
    <h2 class="about__title serif">About</h2>
    <nuxt-content :document="about" class="about__text"></nuxt-content>
  </section>
</template>

<script>
export default {
  props: { about: { type: Object, required: true, default: () => ({}) } },
  mounted() {
    const { section } = this.$refs

    const gsap = this.$gsap

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scrub: 1,
      },
    })

    tl.to('body', { backgroundColor: '#0e0d0d' })
    tl.to('body', { backgroundColor: '#fff' })
  },
}
</script>

<style lang="scss">
.about {
  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;
  min-height: 100vh;
  color: #dfdfdf;

  &__title {
    text-align: center;
  }

  &__text {
    p {
      font-size: var(--step--1);
      line-height: 1.75;
      letter-spacing: 0.1px;
    }
  }
}
</style>
