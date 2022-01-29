<template>
  <section ref="contact" class="contact">
    <a
      ref="contactMarquee"
      class="contact__marquee"
      href="mailto:contact@bogdankostyuk.xyz"
    >
      <span class="sr-only">send me email</span>
      <span
        v-for="key in 3"
        :key="key"
        ref="contactMarqueeText"
        aria-hidden="true"
        class="contact__marquee__text"
      >
        Send me an <span class="serif">email</span>&nbsp; - &nbsp;
      </span>
      <div ref="contactMarqueeBlock" class="contact__marquee__block"></div>
    </a>
  </section>
</template>

<script>
export default {
  mounted() {
    const { contact, contactMarquee, contactMarqueeText, contactMarqueeBlock } =
      this.$refs

    const gsap = this.$gsap

    gsap.to(contactMarqueeText, {
      xPercent: -100,
      repeat: -1,
      ease: 'none',
      duration: 15,
    })

    gsap.fromTo(
      contactMarquee,
      { yPercent: 'random(-15, -20)' },
      {
        yPercent: 'random(15, 20)',
        scrollTrigger: { trigger: contact, scrub: true },
      }
    )

    gsap.fromTo(
      contactMarqueeBlock,
      { top: '0%', bottom: '0%' },
      {
        top: '50%',
        bottom: '50%',
        duration: 0.5,
        scrollTrigger: {
          trigger: contact,
          start: 'top bottom-=15%',
          once: true,
        },
        onComplete: () =>
          contactMarqueeBlock.classList.add('contact__marquee__block--hidden'),
      }
    )
  },
}
</script>

<style lang="scss">
.contact {
  padding-top: 4rem;
  padding-bottom: 8rem;

  overflow: hidden;

  &__marquee {
    display: flex;

    position: relative;

    color: #303030;
    text-decoration: none;

    overflow: hidden;

    &__text {
      display: inline-block;

      position: relative;

      font-size: calc(var(--step-5) * 1.25 + 3vw);
      margin: 0;
      white-space: nowrap;
    }

    &__block {
      position: absolute;
      left: 0;
      right: 0%;
      top: 0;
      bottom: 0;

      background-color: rgba($color: #ffffff, $alpha: 1);

      transition: background-color 100ms ease;

      &--hidden {
        background-color: rgba($color: #ffffff, $alpha: 0);
      }
    }
  }
}
</style>
