<script setup>
const { gsap } = useGsap();

const heading = ref(null);

onMounted(() => {
  gsap.fromTo(
    heading.value.querySelectorAll(".heading__line__content"),
    { yPercent: -105 },
    {
      yPercent: 0,
      ease: "expo.out",
      duration: 1.25,
      stagger: 0.175,
      scrollTrigger: {
        trigger: heading.value,
        start: "top 75%",
        once: true,
      },
    }
  );
});
</script>

<template>
  <h2 ref="heading" class="heading" data-scroll data-scroll-speed="-1">
    <span class="heading__line">
      <span class="heading__line__content">
        <slot></slot>
      </span>
    </span>
  </h2>
</template>

<style lang="scss">
.heading {
  text-align: center;

  width: 100%;

  opacity: 0.85;

  &__line {
    display: inline-block;

    position: relative;

    line-height: 1.225;

    overflow: hidden;

    &__content {
      display: inline-block;
    }
  }
}
</style>
