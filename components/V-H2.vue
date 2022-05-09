<script setup>
import SplitType from 'split-type';

const { gsap } = useGsap();

const heading = ref(null);

onMounted(() => {
  const text = new SplitType(heading.value, {
    types: 'lines, words',
    lineClass: 'heading__line',
    wordClass: 'heading__line__word',
  });

  for (const line of text.lines) {
    const lineParent = line.parentNode;
    line.remove();

    const wrapper = document.createElement('div');
    wrapper.classList.add('heading__line__wrapper');

    lineParent.appendChild(wrapper);
    wrapper.appendChild(line);
  }

  gsap.fromTo(
    text.words,
    { yPercent: -105 },
    {
      yPercent: 0,
      ease: 'expo.out',
      duration: 1.25,
      stagger: 0.1,
      scrollTrigger: {
        trigger: heading.value,
        start: 'top 75%',
        once: true,
      },
    }
  );
});
</script>

<template>
  <h2 ref="heading" class="heading" data-scroll data-scroll-speed="-1">
    <slot />
  </h2>
</template>

<style lang="scss">
.heading {
  text-align: center;

  width: 100%;
  max-width: 550px;

  margin: 0 auto;
  opacity: 0.85;

  &__line {
    line-height: 1.225;

    &__wrapper {
      overflow: hidden;
    }
  }
}
</style>
