<script setup>
const projects = [
  {
    title: 'LPNU StudRecruit',
    source: '',
    live: 'https://studrecruit.lpnu.ua',
    tags: ['Website', 'Seo', 'Next.js', 'Scss', 'Gsap'],
    desc: 'Website build for student recruiting department in Lviv Polytechnics',
    image: '/img/studrecruit-img.png',
    createdAt: '2022-04-01T00:00:00+03:00',
  },
  {
    title: 'Portfolio',
    source: 'https://github.com/logotip4ik/portfolio/tree/v4-pika',
    live: 'https://bogdankostyuk.xyz',
    tags: ['Website', 'Seo', 'Nuxt.js', 'Three.js', 'Gsap', 'Scss'],
    desc: 'This is my portfolio, used probably all of my knowledge to create this sort of animations and interactions. Currently open to work, so send get in contact with me as soon as posible',
    image: '/img/portfolio.png',
    createdAt: '2022-03-31T00:00:00+03:00',
  },
];
</script>

<template>
  <section class="projects" data-scroll-section>
    <VH2>Projects</VH2>

    <ul class="projects__list">
      <VProjectsItem
        v-for="(project, key) in projects"
        :id="key"
        :key="key"
        :project="project"
        :aria-label="project.title"
        class="projects__list__item"
      >
      </VProjectsItem>
    </ul>
  </section>
</template>

<style lang="scss">
.projects {
  color: var(--ff-color);

  margin-top: -1px;
  padding: 4rem clamp(1rem, 7vw, 5rem) 1rem;

  background-color: var(--surface-color);

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
      margin-block-start: 5rem;

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
