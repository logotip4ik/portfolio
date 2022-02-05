<template>
  <li ref="work" class="work">
    <a
      :href="work.live"
      :aria-label="`open live ${work.title}`"
      target="_blank"
      rel="noopener noreferrer"
      class="work__wrapper"
    >
      <div ref="workImageWrapper" class="work__image__wrapper">
        <nuxt-img
          ref="workImage"
          :src="work.image"
          :alt="work.title"
          class="work__image"
          format="webp"
          sizes="sm:500 md:900 lg:100%"
          quality="90"
        />
      </div>
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
      ref="workSource"
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
    const { work, workImage, workSource, workImageWrapper } = this.$refs

    const gsap = this.$gsap

    const imageResizeObserver = new ResizeObserver((ev) =>
      gsap.to(workSource, {
        '--image-height': `${workImageWrapper.clientHeight}px`,
      })
    )
    imageResizeObserver.observe(workImage.$el)

    gsap.fromTo(
      work,
      { opacity: 0, y: '2rem' },
      {
        opacity: 1,
        y: '0rem',
        duration: 0.3,
        delay: 0.125 * this.i,
        scrollTrigger: { trigger: work, start: 'top bottom-=15%', once: true },
      }
    )

    const imageMovement = 3

    // NOTE: max objectPosition y should be the same as in css (see --top-offset)
    gsap.fromTo(
      workImage.$el,
      { yPercent: imageMovement * -1 },
      {
        yPercent: imageMovement,
        scrollTrigger: { trigger: work, scrub: true },
      }
    )
  },
}
</script>

<style lang="scss">
@use 'sass:color';

.work {
  --base-transition-props: 200ms cubic-bezier(0.5, 1, 0.89, 1);

  position: relative;

  max-width: 475px;

  &__wrapper {
    display: grid;
    grid-template-rows: fit-content fit-content;
    gap: 1rem;

    text-decoration: none;

    &:is(:hover, :focus-within) {
      img {
        transform: scale(--active-scale);
      }
    }
  }

  &__image {
    width: 100%;
    height: 110%;

    aspect-ratio: 1/1;

    object-fit: cover;
    object-position: center center;

    transition: transform var(--base-transition-props);

    &__wrapper {
      width: 100%;
      max-height: 60vw;

      overflow: hidden;
    }
  }

  &__content {
    $text-color: color.adjust(
      $color: #fff,
      $lightness: -25%,
    );

    &__title {
      font-size: calc(var(--step-0) + 0.4rem);
      letter-spacing: 0.25px;
      color: $text-color;

      margin-bottom: 0;
    }

    &__tags {
      color: darken($text-color, 5);
      font-size: calc(var(--step--2) - 0rem);
    }
  }

  &__source {
    --pd: 0.5rem;

    position: absolute;
    z-index: 1;
    top: calc(var(--image-height) - var(--pd));
    right: var(--pd);

    max-width: var(--step-3);
    max-height: var(--step-3);

    min-width: 48px;
    min-height: 48px;

    mix-blend-mode: screen;

    color: darken($color: white, $amount: 10);

    transform: translateY(-100%);
  }
}
</style>
