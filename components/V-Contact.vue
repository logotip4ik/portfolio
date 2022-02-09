<template>
  <section ref="contact" class="contact">
    <a
      ref="contactMarquee"
      v-hoverable
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
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const { contact, contactMarquee, contactMarqueeText, contactMarqueeBlock } =
      this.$refs

    const gsap = this.$gsap

    if (!prefersReducedMotion)
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

    const scrollTrigger = {
      trigger: contact,
      start: 'top bottom-=15%',
      once: true,
    }

    if (prefersReducedMotion)
      gsap.to(contactMarqueeBlock, { opacity: 0, scrollTrigger })
    else
      gsap.fromTo(
        contactMarqueeBlock,
        { top: '0%', bottom: '0%' },
        {
          top: '50%',
          bottom: '50%',
          duration: 0.5,
          scrollTrigger,
          onComplete: () =>
            contactMarqueeBlock.classList.add(
              'contact__marquee__block--hidden'
            ),
        }
      )
  },
}
</script>

<style lang="scss">
.contact {
  width: 100%;
  max-width: 100vw;

  padding: 4rem 0 8rem;

  overflow: hidden;

  &__marquee {
    display: flex;

    position: relative;

    color: darken($color: white, $amount: 40);
    text-decoration: none;

    overflow: hidden;

    @media (prefers-reduced-motion: reduce) {
      // NOTE: important is needed for overwriting styles which was set by JS
      cursor: pointer !important;
    }

    &__text {
      display: inline-block;

      position: relative;

      font-size: calc(var(--step-5) * 1.25 + 3vw);
      margin: 0;
      white-space: nowrap;

      @media (prefers-reduced-motion: reduce) {
        font-size: var(--step-5);

        transform: translateX(calc(65vw * -1));
      }
    }

    &__block {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      background-color: rgba($color: #030303, $alpha: 1);

      transition: background-color 100ms ease;

      &--hidden {
        background-color: rgba($color: #030303, $alpha: 0);
      }
    }
  }
}
</style>
