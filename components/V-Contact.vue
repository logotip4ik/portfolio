<script setup>
const { $smoothScrollBreakPoint } = useNuxtApp();
const { gsap } = useGsap();

const rowsCount = 3;
const textCount = 4;

const contact = ref(null);
const contactEmailRow = ref(null);

onMounted(() => {
  const scrollTriggerFactory = (trigger) => ({
    trigger,
    scrub: window.innerWidth >= $smoothScrollBreakPoint ? true : 0.5,
  });

  contactEmailRow.value.forEach((item) => {
    const scrollTrigger = scrollTriggerFactory(item);

    const sumWidth =
      item.offsetWidth + window.innerWidth / (window.innerWidth < 700 ? 2 : 4);

    gsap.fromTo(
      item,
      { x: window.innerWidth },
      { x: -sumWidth, scrollTrigger }
    );
  });
});
</script>

<template>
  <section ref="contact" class="contact" data-scroll-section>
    <NuxtLink
      ref="contactEmail"
      v-hoverable.mail
      href="mailto:contact@bogdankostyuk.xyz"
      class="contact__email"
    >
      <span
        v-for="row in rowsCount"
        :key="row"
        ref="contactEmailRow"
        aria-hidden="true"
        class="contact__email__row"
      >
        <span
          v-for="textKey in textCount"
          :key="textKey"
          aria-hidden="true"
          class="contact__email__row__text"
        >
          Send me an <span class="serif">email</span
          ><span v-if="textKey !== textCount">&nbsp; - &nbsp;</span>
        </span>
      </span>
    </NuxtLink>
  </section>
</template>

<style lang="scss">
.contact {
  width: 100%;

  padding: 5rem 0 8rem;

  overflow: hidden;

  &__email {
    display: block;

    position: relative;

    color: darken($color: white, $amount: 40);
    line-height: 1;
    text-decoration: none;

    cursor: none;

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
      cursor: pointer;
    }
  }
}
</style>
