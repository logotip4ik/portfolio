<template>
  <div ref="project" class="project">
    <header ref="projectHeader" class="project__header">
      <h2 ref="projectHeaderName" class="project__header__name">
        <span v-for="(words, i) in projectNameWords" :key="i">
          {{ words }}
        </span>
      </h2>

      <ul v-if="project.source || project.live" class="project__header__links">
        <a
          v-if="project.live"
          :href="project.live"
          class="project__header__links__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Live
        </a>
        <a
          v-if="project.source"
          :href="project.source"
          class="project__header__links__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </ul>

      <Blob
        v-for="i in 2"
        :key="i"
        ref="projectHeaderBlobs"
        :delay-to-appear="1"
        :repeat-duration="15"
      />
    </header>

    <component
      :is="`section${sectionType}`"
      v-for="(sectionType, key) in sections"
      ref="projectSections"
      :key="key"
      :project="project"
      class="project__section"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const project = await $content('projects/' + params.slug).fetch()

    return { project }
  },
  data: () => ({
    sections: ['Description', 'Gallery', 'Description'],
  }),
  computed: {
    projectNameWords() {
      return this.project.name.split(' ')
    },
  },
  mounted() {
    setTimeout(() => {
      const gsap = this.$gsap

      const { projectHeaderName, projectHeader, projectSections } = this.$refs

      gsap.fromTo(
        projectHeaderName.children,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, delay: 0.25, duration: 0.75, stagger: 0.05 }
      )

      gsap.fromTo(
        projectHeaderName,
        { y: -50 },
        {
          y: 400,
          scrollTrigger: {
            id: 1,
            scrub: 1.25,
            trigger: projectHeader,
            start: 'top top',
            end: 'bottom top',
            invalidateOnRefresh: true,
          },
        }
      )

      for (const { $el } of projectSections) {
        gsap.to($el, {
          scrollTrigger: {
            trigger: $el,
            start: 'top top',
            pin: true,
            invalidateOnRefresh: true,
          },
        })
      }
    }, 50)
  },
}
</script>

<style lang="scss">
.project {
  position: relative;
  z-index: 10;
  isolation: isolate;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: -1;

    min-height: 90vh;
    padding: 0 5vw;

    &__name {
      display: inline-block;

      font-size: calc(3rem + 0.5vw);
      text-align: center;

      max-width: 15ch;
      overflow: hidden;

      span {
        display: inline-block;
        margin-right: 1rem;

        opacity: 0;
      }
    }

    &__links {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;

      position: absolute;
      z-index: -1;
      bottom: 6rem;
      left: clamp(2rem, 2vw, 5rem);

      padding-left: 0;

      &__link {
        font-size: calc(1.75rem + 0.33vw);
        margin: 0.25rem 0;

        &::before {
          content: '↗';
        }
      }
    }
  }

  &__section {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: 10;

    width: 100%;
    height: 100vh;
    padding: 2vw 5vw;
  }
}
</style>
