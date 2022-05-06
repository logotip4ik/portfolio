<template>
  <section ref="contact" class="contact" data-scroll-section>
    <a
      ref="contactEmail"
      v-hoverable
      href="mailto:contact@bogdankostyuk.xyz"
      rel="noopener"
      class="contact__email"
    >
      <span class="sr-only"> send me an email </span>
      <span
        v-for="row in 3"
        :key="row"
        ref="contactEmailRow"
        aria-hidden="true"
        class="contact__email__row"
      >
        <span
          v-for="textKey in textCount"
          :key="textKey"
          ref="contactMarqueeText"
          aria-hidden="true"
          class="contact__email__row__text"
        >
          Send me an <span class="serif">email</span
          ><span v-if="textKey !== textCount">&nbsp; - &nbsp;</span>
        </span>
      </span>
    </a>
  </section>
</template>

<script>
export default {
  data: () => ({ textCount: 4 }),
  mounted() {
    // const prefersReducedMotion = this.$prefersReducedMotion()

    const { contact, contactEmailRow } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      contactEmailRow,
      { yPercent: 'random(-15, -20)' },
      {
        yPercent: 'random(15, 20)',
        scrollTrigger: { trigger: contact, scrub: true },
      }
    )

    const scrollTriggerFactory = (trigger) => ({
      trigger,
      scrub: window.innerWidth >= this.$smoothScrollBreakPoint ? true : 0.5,
    })

    contactEmailRow.forEach((item, key) => {
      const sumWidth =
        item.offsetWidth + window.innerWidth / (window.innerWidth < 700 ? 2 : 4)
      const scrollTrigger = scrollTriggerFactory(item)

      gsap.fromTo(
        item,
        { x: window.innerWidth },
        { x: -sumWidth, scrollTrigger }
      )
    })
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

  &__email {
    display: block;
    position: relative;

    line-height: 1;

    color: darken($color: white, $amount: 40);
    text-decoration: none;

    &__row {
      display: block;

      font-size: var(--step-5);
      margin: 0;
      white-space: nowrap;
      will-change: transform;

      @supports (-webkit-text-stroke: 1px white) {
        color: transparent;
        -webkit-text-stroke: 1px darken($color: white, $amount: 40);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      // NOTE: important is needed for overwriting styles which was set by JS
      cursor: pointer !important;
    }
  }
}
</style>

