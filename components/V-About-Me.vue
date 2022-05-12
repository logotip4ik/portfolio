<script setup>
import SplitType from 'split-type';

const { gsap } = useGsap();

const aboutText =
  'My name is Bogdan Kostyuk and I am Ukrainian based Front End developer, passionate about UI effects, animations and code. Mostly in use are Nuxt.js and Next.js, Scss for styling and Gsap for smooth animations, also recently got my hands on three.js.';

const aboutMeContent = ref(null);

onMounted(() => {
  const text = new SplitType(aboutMeContent.value, {
    types: 'lines',
    lineClass: 'about-me__content__line',
  });

  gsap.fromTo(
    text.lines,
    { '--overlay-offset': '0%' },
    {
      '--overlay-offset': '100%',
      stagger: 0.125,
      ease: 'none',
      scrollTrigger: {
        trigger: aboutMeContent.value,
        start: 'top 80%',
        end: 'bottom 85%',
        scrub: 0.15,
      },
    }
  );
});
</script>

<template>
  <section class="about-me" data-scroll-section>
    <VH2 class="about-me__title">About Me</VH2>

    <p ref="aboutMeContent" class="about-me__content">
      {{ aboutText }}
    </p>
  </section>
</template>

<style lang="scss">
.about-me {
  color: var(--ff-color);

  margin-top: -1px;
  padding: 4rem clamp(1rem, 7vw, 5rem) 1rem;

  background-color: var(--surface-color);

  transition: background-color 400ms, color 400ms;
  pointer-events: all;

  &__title {
    opacity: 0.85;

    margin-top: 1rem;
    margin-bottom: 5rem;
  }

  &__content {
    position: relative;

    font-size: calc(var(--step-3) - 0.25rem);
    line-height: 1.25;
    color: darken($color: #ffffff, $amount: 25);
    text-align: left;

    overflow: hidden;

    &__line {
      position: relative;

      &::after {
        content: '';

        position: absolute;
        inset: 0;

        background-color: var(--surface-color);
        opacity: 0.9;

        transform: translateX(var(--overlay-offset, 0%));
      }
    }

    @media (prefers-color-scheme: light) {
      color: lighten($color: #000000, $amount: 25);
    }
  }
}
</style>
