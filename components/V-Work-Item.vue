<template>
  <li ref="work" v-hoverable class="work">
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
      <SourceSVG></SourceSVG>
    </a>
  </li>
</template>

<script>
import SourceSVG from '~/assets/img/source.svg?inline'

export default {
  components: { SourceSVG },
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

    const imageResizeObserver = new ResizeObserver((ev) => {
      if (!workSource) return
      gsap.to(workSource, {
        '--image-height': `${workImageWrapper.clientHeight}px`,
      })
    })
    imageResizeObserver.observe(workImage.$el)

    gsap.fromTo(
      work,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        ease: 'power4.out',
        duration: 0.75,
        scrollTrigger: { trigger: work, start: 'top bottom-=10%', once: true },
      }
    )

    const imageMovement = 3
    const randomMultiplier = gsap.utils.random(0.875, 1.125)

    gsap.fromTo(
      workImage.$el,
      { yPercent: randomMultiplier * imageMovement * -1 },
      {
        yPercent: randomMultiplier * imageMovement,
        scrollTrigger: { trigger: work, scrub: true },
      }
    )
  },
}
</script>

<style lang="scss">
@use 'sass:color';

.work {
  position: relative;

  max-width: 475px;
  will-change: transform;

  &__wrapper {
    display: grid;
    grid-template-rows: fit-content fit-content;
    gap: 1rem;

    cursor: none;
    text-decoration: none;
  }

  &__image {
    width: 100%;
    height: 110%;

    aspect-ratio: 1/1;

    object-fit: cover;
    object-position: center center;
    will-change: transform;

    &__wrapper {
      width: 100%;
      min-height: 21rem;
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

    cursor: none;
    color: darken($color: white, $amount: 10);

    transform: translateY(-100%);
  }

  &::after {
    content: '';

    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba($color: #030303, $alpha: 0.35);
    pointer-events: none;

    transition: opacity 400ms;
  }

  &:is(:focus, :hover) {
    &::after {
      opacity: 0;
    }
  }
}
</style>
