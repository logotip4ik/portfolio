<template>
  <li ref="project" class="project">
    <div class="project__content">
      <h3 ref="projectTitle" class="project__content__title">
        LPNU StudRecruit
      </h3>
      <span
        ref="projectCover"
        class="project__content__cover"
        aria-hidden="true"
      ></span>
      <hr class="project__content__hr" />
      <ul class="project__content__desc-list">
        <li
          v-for="j in 5"
          :key="j"
          ref="projectDescItems"
          class="project__content__desc-list__item"
        >
          Next.js,
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  mounted() {
    const { project, projectTitle, projectCover, projectDescItems } = this.$refs
    const gsap = this.$gsap

    const tl = gsap.timeline({
      scrollTrigger: { trigger: project, start: 'top bottom-=25px' },
    })

    tl.fromTo(
      projectCover,
      { clipPath: 'inset(0% 0% 0% 0%)' },
      {
        clipPath: 'inset(49% 0% 49% 0%)',
        duration: 1,
      }
    )

    tl.fromTo(
      projectCover,
      { clipPath: 'inset(49% 0% 49% 0%)' },
      { clipPath: 'inset(49% 0% 49% 100%)', duration: 1 }
    )

    tl.set(projectCover, { display: 'none', duration: 0 })

    tl.fromTo(projectTitle, { opacity: 0 }, { opacity: 1 }, '<-0.5')
    tl.fromTo(
      projectDescItems,
      { opacity: 0 },
      { opacity: 1, stagger: { amount: 0.5, from: 'end' } },
      '<-0.5'
    )
  },
}
</script>

<style lang="scss">
.project {
  margin-bottom: 1.5rem;

  &::marker {
    content: '/ ' counter(list-item) '  ';
    font-variant-numeric: diagonal-fractions;
  }

  &__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    position: relative;

    transition: transform 0.4s ease;

    &__title {
      display: inline-block;
      font-size: calc(1.5rem + 0.33vw);
      font-weight: 500;
    }

    &__cover {
      display: inline-block;

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;

      background-color: var(--surface-color);
    }

    &__hr {
      display: inline-block;

      flex: 1;

      width: 100%;
      margin-left: 2rem;
      border-color: #fff;
    }

    &__desc-list {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      position: absolute;
      top: 60%;
      right: 0;

      padding: 0;
      list-style-type: none;

      &__item {
        display: inline-block;

        font-size: calc(0.75rem + 0.3vw);
        color: var(--ff-secondary-color);

        & + & {
          margin-left: 0.5rem;
        }
      }
    }

    &:hover {
      transform: scale(1.01);
    }
  }
}
</style>
