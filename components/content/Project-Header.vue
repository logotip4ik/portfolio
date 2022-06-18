<script setup>
const { gsap } = useGsap();
const emitter = useEmitter();

onMounted(() => {
  emitter.once('overlay:hiding', () => {
    gsap.to('.project-header__info__links__item__content', {
      yPercent: -110,
      stagger: { from: 'end', each: 0.075 },
      ease: 'expo.out',
      duration: 1,
      delay: 0.225,
    });
  });
});
</script>

<template>
  <header class="project-header" data-scroll-section>
    <slot class="project-header__title" />

    <div class="project-header__info">
      <ul class="project-header__info__links">
        <li
          v-if="$slots.live"
          class="project-header__info__links__item project-header__info__links__item--live"
        >
          <span class="project-header__info__links__item__content">
            <slot name="live" />
          </span>
        </li>
        <li
          v-if="$slots.source"
          class="project-header__info__links__item project-header__info__links__item--source"
        >
          <span class="project-header__info__links__item__content">
            <slot name="source" />
          </span>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss">
.project-header {
  padding: 30vh clamp(1rem, 7vw, 10rem) 5vh;

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-top: 2rem;

    &__links {
      display: grid;
      justify-content: start;
      align-content: end;
      grid-template-rows: 1fr;
      gap: 0.5rem;

      text-align: right;

      padding: 0;
      margin-left: auto;
      list-style-type: none;

      &__item {
        overflow: hidden;

        &__content {
          display: inline-block;

          transform: translateY(110%);
        }
      }
    }
  }
}
</style>
