<template>
  <section
    ref="works"
    class="works"
    aria-label="works section"
    data-scroll-section
  >
    <V-H2 aria-label="work section heading" class="works__title">Work</V-H2>
    <ul class="works__list" aria-label="works list">
      <V-Work-Item
        v-for="(work, key) in works"
        :id="key"
        :key="key"
        ref="worksListItems"
        :work="work"
        :aria-label="work.title"
        class="works__list__item"
      >
      </V-Work-Item>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => ({ works: [] }),
  async fetch() {
    this.works = await this.$content('works')
      .sortBy('createdAt', 'desc')
      .fetch()
  },
}
</script>

<style lang="scss">
.works {
  color: white;

  margin-top: -1px;
  padding: 4rem clamp(1rem, 7vw, 5rem) 1rem;

  background-color: var(--black-color);

  transition: background-color 400ms, color 400ms;
  pointer-events: all;

  &__title {
    margin-bottom: 4rem;

    // NOTE: smoothscroll (locomotive scroll) breakpoint
    @media screen and (min-width: 1024px) {
      margin-bottom: 7rem;
    }
  }

  &__list {
    --spacing: 60%;

    display: grid;
    justify-items: center;
    align-items: start;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: calc(1.25 * var(--step-5));

    max-width: 1100px;

    list-style-type: none;
    margin: 0 auto;
    padding-inline-start: 0;

    @media screen and(min-width: 850px) {
      &__item:nth-child(odd) {
        margin-block-start: calc(-0.75 * var(--spacing));
      }

      &__item:nth-child(even) {
        margin-block-start: calc(0.125 * var(--spacing));
      }

      &__item:first-of-type {
        margin-block-start: 0;
      }

      &__item:nth-child(2) {
        margin-block-start: var(--spacing);
      }
    }
  }

  @media (prefers-color-scheme: light) {
    color: #252525;
  }
}
</style>
