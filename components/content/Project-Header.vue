<script setup>
const { gsap } = useGsap();
const emitter = useEmitter();

const slots = ['live', 'source'];

const revealInfoLinks = () =>
  gsap.utils.toArray('.project-header__info__links__item__content').length === 0
    ? setTimeout(revealInfoLinks, 20)
    : gsap.to('.project-header__info__links__item__content', {
        yPercent: -110, // eslint-disable-line
        stagger: { from: 'end', each: 0.075 }, // eslint-disable-line
        ease: 'expo.out', // eslint-disable-line
        duration: 1, // eslint-disable-line
        delay: 0.275, // eslint-disable-line
      }); // eslint-disable-line

let timeout;
onMounted(() => {
  timeout = setTimeout(revealInfoLinks, 850);
});

emitter.once('overlay:hiding', () => {
  revealInfoLinks();

  clearTimeout(timeout);
});
</script>

<template>
  <header class="project-header" data-scroll-section>
    <slot class="project-header__title" />

    <div class="project-header__info">
      <ul class="project-header__info__links">
        <template v-for="(slot, key) in slots">
          <li
            v-if="$slots[slot]"
            :key="key"
            :class="[
              'project-header__info__links__item',
              `project-header__info__links__item--${slot}`,
            ]"
          >
            <span class="project-header__info__links__item__content">
              <slot :name="slot" />
            </span>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<style lang="scss">
.project-header {
  padding: 30vh clamp(1rem, 7vw, 10rem) 7vh;

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
