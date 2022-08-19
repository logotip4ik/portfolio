<script setup>
const props = defineProps({
  type: { type: String, required: false, default: '' },
});

const typeClasses = computed(() => {
  if (props.type === '') return [''];

  return props.type.split(',').map((type) => `project-section--${type}`);
});
</script>

<template>
  <section
    v-bind="$attrs"
    :class="['project-section', ...typeClasses]"
    data-scroll-section
  >
    <Markdown :use="$slots.default" />
  </section>
</template>

<style lang="scss">
.project-section {
  font-size: var(--step-0);
  line-height: 1.7;

  width: 100%;

  padding: 0 clamp(1rem, 7vw, 10rem);
  margin-bottom: 2rem;

  ul {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1.25rem;

    padding: 0;
    list-style-type: none;

    li {
      padding: 0;
      margin: 0.5rem 0.75rem;

      @supports (gap: 1rem) {
        margin: 0;
      }
    }
  }

  p {
    margin-block: 2.125rem;

    @media (prefers-color-scheme: dark) {
      opacity: 0.925;
    }
  }

  &--fwidth {
    height: auto;

    padding: 0;
    margin-bottom: 10rem;
  }

  &--text {
    max-width: 55ch;

    margin-bottom: 10rem;
  }

  &--2-col {
    --gap: 1rem;

    display: grid;
    grid-template-columns: calc(var(--col-1) - calc(var(--gap) / 1.39)) auto;
    gap: var(--gap);

    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, auto);
    }
  }
}
</style>
