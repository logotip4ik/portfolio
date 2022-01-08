<template>
  <li class="work" tabindex="0">
    <a :href="work.live" target="_blank" class="work__wrapper">
      <img
        ref="workImage"
        :src="work.image"
        :alt="work.title"
        class="work__image"
        width="400"
      />
      <div class="work__content">
        <h3 class="work__content__title">{{ work.title }}</h3>
        <p class="work__content__tags">
          {{ tagsString }}
        </p>
        <!-- TODO: add somewhere somehow link to the source if the are one -->
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: { work: { type: Object, required: true, default: () => ({}) } },
  computed: {
    tagsString() {
      return this.work.tags.reduce((str, val) => `${str}, ${val}`)
    },
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
    position: absolute;
    left: 0;
    top: 0;
    z-index: -2;

    width: 100%;
    height: 100%;

    object-fit: cover;

    transition: transform var(--base-transition-props);
  }

  &__content {
    $text-color: #eee;

    height: 100%;

    padding: 1rem 2rem;

    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.55) 0%,
      rgba(0, 0, 0, 0.3) 25%,
      rgba(0, 0, 0, 0.125) 33%,
      rgba(0, 0, 0, 0) 50%
    );

    &__title {
      font-size: var(--step-2);
      margin-bottom: 0;

      color: $text-color;
    }
    &__tags {
      color: darken($text-color, 5);
    }
  }

  &:is(:hover, :focus-visible) {
    --active-scale: 0.95;

    transform: scale(var(--active-scale));

    .work__image {
      transform: scale(calc(2 - var(--active-scale)));
    }
  }
}
</style>
