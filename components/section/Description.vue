<template>
  <section ref="section" class="section">
    <p class="section__description">
      <!-- eslint-disable -->
      <span
        v-for="(char, key) in projectDescriptionChars"
        :key="key"
        ref="sectionDescriptionChars"
        class="section__description__char"
        v-html="char"
      ></span>
      <!-- eslint-enable -->
    </p>
  </section>
</template>

<script>
export default {
  props: { project: { type: Object, required: true, default: () => ({}) } },
  computed: {
    projectDescriptionChars() {
      return this.project.description.split('')
    },
  },
  mounted() {
    const gsap = this.$gsap
    const { section, sectionDescriptionChars } = this.$refs

    const charsTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center-=100px',
        end: 'bottom+=50% center',
        scrub: 0.25,
      },
    })

    for (const char of sectionDescriptionChars) {
      charsTl.to(char, {
        stagger: 0.1,
        onUpdate: () => {
          const classFunction =
            charsTl.scrollTrigger.direction < 0 ? 'remove' : 'add'
          char.classList[classFunction]('section__description__char--active')
        },
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.section {
  background-color: var(--ff-color);

  &__description {
    font-size: calc(2rem + 2vw);
    line-height: 1.75;
    text-align: left;

    -webkit-text-stroke: 1px var(--surface-color);

    @supports (-webkit-text-stroke: 1px var(--surface-color)) {
      color: var(--ff-color);
    }

    &__char {
      transition: color var(--transition-time)
        var(--transition-function-ease-out);

      &--active {
        color: var(--surface-color);
      }
    }
  }
}
</style>
