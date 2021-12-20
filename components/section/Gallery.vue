<template>
  <section ref="section" class="section">
    <ul ref="sectionList" class="section__list">
      <li
        v-for="(image, key) in project.images"
        ref="sectionListItems"
        :key="key"
        class="section__list__item"
      >
        <nuxt-img :src="image" width="600" height="600" />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: { project: { type: Object, required: true, default: () => ({}) } },
  mounted() {
    const gsap = this.$gsap

    const { sectionList, section } = this.$refs

    const x = '100%'
    const xEnd = (sectionList.scrollWidth - section.offsetWidth) * -1 + 175

    gsap.fromTo(
      sectionList,
      { x },
      {
        x: xEnd,
        scrollTrigger: {
          trigger: section,
          start: 'bottom-=35% top+=100px',
          end: 'bottom+=150% top+=100px',
          scrub: 1.25,
        },
      }
    )
  },
}
</script>

<style lang="scss" scoped>
.section {
  padding: 2vw 5vw;
  background-color: var(--surface-color);

  display: flex;
  overflow-x: hidden;

  &__list {
    display: flex;

    padding-left: 0;
    list-style-type: none;

    &__item {
      flex-shrink: 0;
      width: clamp(500px, 60vw, 800px);

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }

  img {
    display: block;

    width: 100%;
    height: auto;
    object-fit: contain;

    max-height: 90vh;
  }
}
</style>
