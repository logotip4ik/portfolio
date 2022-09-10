<script setup>
import SplitType from 'split-type';

const { data: aboutMeText } = await useAsyncData('about-me-text', () =>
  queryContent('about-me').findOne()
);

const { $smoothScrollBreakPoint } = useNuxtApp();
const { gsap } = useGsap();

const aboutMeContent = ref(null);

onMounted(() => {
  const text = new SplitType(aboutMeContent.value.$el.firstChild, {
    types: 'lines',
    lineClass: 'about-me__content__line',
  });

  const revealAnimation = gsap.fromTo(
    text.lines,
    { '--overlay-offset': '0%' },
    {
      '--overlay-offset': '100%',
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: aboutMeContent.value.$el,
        start: 'top 80%',
        end: 'bottom 85%',
        scrub: window.innerWidth >= $smoothScrollBreakPoint ? true : 0.5,
      },
    }
  );

  onBeforeUnmount(() => {
    revealAnimation.scrollTrigger.kill();
  });
});
</script>

<template>
  <section class="about-me" data-scroll-section>
    <VH2 class="about-me__title">About Me</VH2>

    <ContentRenderer
      ref="aboutMeContent"
      :value="aboutMeText"
      class="about-me__content"
    />
  </section>
</template>

<style lang="scss">
.about-me {
  color: var(--ff-color);

  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;
  margin-top: -2px;

  background-color: var(--surface-color);

  pointer-events: all;
  transition: color 400ms;

  &__title {
    opacity: 0.85;

    margin-top: 1rem;
    margin-bottom: 6rem;
  }

  &__content {
    position: relative;

    font-size: calc(var(--step-2) + 0.125rem);
    line-height: 1.3;
    color: darken($color: #ffffff, $amount: 25);
    text-align: left;

    width: fit-content;
    max-width: 30ch;

    margin: 0 auto;

    overflow: hidden;

    &__line {
      width: fit-content !important;

      position: relative;

      &::after {
        content: '';

        position: absolute;
        inset: 0;

        background-color: var(--surface-color);
        opacity: 0.825;

        transform: translateX(var(--overlay-offset, 0%));
      }
    }

    @media (prefers-color-scheme: light) {
      color: lighten($color: #000000, $amount: 25);
    }
  }
}
</style>
