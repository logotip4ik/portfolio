<template>
  <section ref="works" class="works" aria-label="works section">
    <V-H2 aria-label="work section heading">Work</V-H2>
    <ul class="works__list" aria-label="works list">
      <V-Work-Item
        v-for="(work, key) in works"
        :key="key"
        ref="worksListItems"
        :work="work"
        :i="key"
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
  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;
  color: white;
  background-color: var(--black-color);

  &__list {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--step-3);

    max-width: 1100px;

    list-style-type: none;
    margin: 0 auto;
    padding-inline-start: 0;

    @media screen and(min-width: 798px) {
      &__item:nth-child(even) {
        margin-block-start: 5rem;
      }
    }
  }
}
</style>
