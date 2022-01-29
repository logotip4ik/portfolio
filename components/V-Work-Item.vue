<template>
  <li ref="work" class="work">
    <a
      :href="work.live"
      :aria-label="`open live ${work.title}`"
      target="_blank"
      rel="noopener noreferrer"
      class="work__wrapper"
    >
      <nuxt-img
        ref="workImage"
        :src="work.image"
        :alt="work.title"
        class="work__image"
        format="webp"
        sizes="sm:500 md:900 lg:100%"
        quality="90"
      />
      <div class="work__content">
        <h3 class="work__content__title">
          {{ work.title }}
        </h3>
        <p class="work__content__tags">
          {{ tagsString }}
        </p>
      </div>
    </a>
    <a
      v-if="work.source"
      :href="work.source"
      :aria-label="`open source of ${work.title}`"
      target="_blank"
      rel="noopener noreferrer"
      class="work__source"
      title="source"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27c.68 0 1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          fill="currentColor"
        ></path>
      </svg>
    </a>
  </li>
</template>

<script>
export default {
  props: {
    work: { type: Object, required: true, default: () => ({}) },
    i: { type: Number, required: false, default: 0 },
  },
  computed: {
    tagsString() {
      return this.work.tags.reduce((str, val) => `${str}, ${val}`)
    },
  },
  mounted() {
    const { work, workImage } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      work,
      { opacity: 0, top: 45 },
      {
        opacity: 1,
        top: 0,
        duration: 0.75,
        delay: 0.125 * this.i,
        scrollTrigger: { trigger: work, start: 'top bottom-=15%', once: true },
      }
    )

    const initialObjectPosition = `center ${window.innerWidth < 700 ? 55 : 62}%`
    const finalObjectPosition = `center ${window.innerWidth < 700 ? 45 : 38}%`

    // NOTE: max objectPosition y should be the same as in css (see --top-offset)
    gsap.fromTo(
      workImage.$el,
      // { objectPosition: `center random(-${maxOffset - 10}, -${maxOffset})px` },
      { objectPosition: initialObjectPosition },
      {
        objectPosition: finalObjectPosition,
        scrollTrigger: { trigger: work, scrub: true },
      }
    )
  },
}
</script>

<style lang="scss">
.work {
  --base-transition-props: 200ms cubic-bezier(0.5, 1, 0.89, 1);

  position: relative;
  width: 100%;
  height: 100%;
  height: calc(60vw + 5rem);
  max-height: 850px;

  isolation: isolate;
  overflow: hidden;
  transition: transform var(--base-transition-props);

  &__wrapper {
    text-decoration: none;
  }

  &__image {
    --top-offset: 70px;

    position: absolute;
    left: 0;
    top: 0;
    z-index: -10;

    width: 100%;
    height: calc(100% + var(--top-offset));

    object-fit: cover;
    object-position: center calc(-1 * var(--top-offset));

    transition: transform var(--base-transition-props);
  }

  &__content {
    $text-color: #eee;

    height: 100%;

    padding: 1rem 2rem;

    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.45) 25%,
      rgba(0, 0, 0, 0) 50%
    );

    &__title {
      font-size: var(--step-2);
      letter-spacing: 0.25px;
      color: $text-color;

      margin-bottom: 0;
    }
    &__tags {
      color: darken($text-color, 5);
      font-size: calc(var(--step--2) + 0.15vw);
    }
  }

  &__source {
    position: absolute;
    z-index: 1;
    bottom: var(--step-2);
    right: var(--step-2);

    max-width: var(--step-3);
    max-height: var(--step-3);

    min-width: 48px;
    min-height: 48px;

    mix-blend-mode: screen;

    color: darken($color: white, $amount: 10);
  }

  &:is(:hover, :focus-within) {
    --active-scale: 0.95;

    transform: scale(var(--active-scale));

    .work__image {
      transform: scale(calc(2 - var(--active-scale)));
    }
  }
}
</style>
