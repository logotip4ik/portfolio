<template>
  <section ref="contact" class="contact">
    <a class="contact__marquee" href="mailto:contact@bogdankostyuk.xyz">
      <span class="sr-only">send me email</span>
      <span
        v-for="key in 4"
        :key="key"
        ref="contactMarqueeText"
        aria-hidden="true"
        class="contact__marquee__text"
      >
        Send me an <span class="serif">email</span>&nbsp; - &nbsp;
      </span>
    </a>
  </section>
</template>

<script>
export default {
  mounted() {
    const { contactMarqueeText } = this.$refs

    const gsap = this.$gsap

    gsap.to(contactMarqueeText, {
      xPercent: -200,
      repeat: -1,
      ease: 'none',
      duration: 15,
    })
  },
}
</script>

<style lang="scss">
.contact {
  padding-block: 4rem 8rem;

  &__marquee {
    display: flex;
    color: #303030;
    text-decoration: none;
    overflow: hidden;

    &__text {
      display: inline-block;

      font-size: calc(var(--step-5) * 1.5 + 2vw);
      margin: 0;
      white-space: nowrap;
    }
  }
}
</style>
