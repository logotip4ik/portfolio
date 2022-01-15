<template>
  <section ref="works" class="works">
    <V-H2>Work</V-H2>
    <ul class="works__list">
      <V-Work-Item
        v-for="(work, key) in works"
        :key="key"
        ref="worksListItems"
        :work="work"
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
    this.works = await this.$content('works').fetch()
  },
}
</script>

<style lang="scss">
.works {
  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;
  color: #303030;

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--step-3);

    max-width: 1100px;

    list-style-type: none;
    margin: 0 auto;
    padding-inline-start: 0;

    @media screen and(min-width: 798px) {
      &__item:nth-child(2n + 1) {
        top: 2.5%;
      }
    }
  }
}
</style>
