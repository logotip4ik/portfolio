<template>
  <section ref="contact" class="contact" data-scroll-section>
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
    const prefersReducedMotion = this.$prefersReducedMotion()

    const { contact, contactMarquee, contactMarqueeBlock } = this.$refs

    const gsap = this.$gsap

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
      gsap.to(contactMarqueeBlock, { autoAlpha: 0, scrollTrigger })
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

  margin-top: -2px;
  padding: 4rem 0 8rem;
  background-color: var(--black-color);

  overflow: hidden;
  pointer-events: all;

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

      font-size: var(--step-5);
      margin: 0;
      white-space: nowrap;
      animation: 10s linear infinite 10s running marquee-text;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
        transform: translateX(calc(65vw * -1));
      }

      @supports (-webkit-text-stroke: 1px red) {
        color: transparent;
        -webkit-text-stroke: 1px darken($color: white, $amount: 40);
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

@keyframes marquee-text {
  from {
    transform: translate3d(0%, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
