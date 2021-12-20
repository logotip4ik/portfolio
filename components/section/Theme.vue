<template>
  <section ref="section" class="section">
    <h2 ref="sectionHeader" class="section__header">Theme Colors</h2>
    <div
      v-for="(color, key) in project.themeColors"
      :key="key"
      ref="sectionColor"
      class="section__color"
      :style="{ backgroundColor: color }"
    >
      <span :style="{ color: color }">
        {{ color.toUpperCase() }}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  props: { project: { type: Object, required: true, default: () => ({}) } },
  mounted() {
    const gsap = this.$gsap

    const { section } = this.$refs

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'bottom+=50%',
        end: 'bottom+=200%',
        scrub: true,
      },
    })

    for (const section of this.$refs.sectionColor)
      tl.fromTo(section, { yPercent: 100 }, { yPercent: 0 })
  },
}
</script>

<style lang="scss">
.section {
  position: relative;

  width: 100%;
  padding: 0;
  background-color: var(--surface-color);

  &__header {
    position: absolute;
    top: 1.75rem;
    left: 5vw;

    font-size: calc(3rem + 0.33vw);
  }

  &__color {
    flex: 1;
    width: 100%;

    font-family: 'Merriweather', serif;
    font-size: calc(2.5rem + 0.33vw);

    height: 100vh;

    padding: 5vh 4vw;

    span {
      filter: invert(100%);
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
}
</style>
