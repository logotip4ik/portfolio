<template>
  <li>
    <NuxtLink ref="project" :to="project.path" class="project">
      <div class="project__inner">
        <h2 class="project__inner__name">{{ project.name }}</h2>
        <p class="project__inner__description">
          {{ project.description }}
        </p>
      </div>
      <ArrowRight class="project__arrow" />
    </NuxtLink>
  </li>
</template>

<script>
import ArrowRight from '~/assets/img/arrow-right.svg?inline'

export default {
  components: { ArrowRight },
  props: { project: { type: Object, required: true, default: () => {} } },
}
</script>

<style lang="scss">
.project {
  display: flex;
  align-items: center;

  position: relative;

  width: 100%;

  padding: 2rem 1.5rem;
  margin-bottom: 1rem;

  &::after {
    content: none;
  }

  &__inner {
    flex: 1;

    transform-origin: left center;
    transition: transform var(--transition-time)
      var(--transition-function-ease-out);

    &__name {
      font-size: 3rem;
      margin-bottom: 1rem;

      cursor: pointer;
    }

    &__description {
      font-size: 1.1rem;
      color: hsl(var(--theme-color), 10%, 50%);
    }
  }

  &:hover &__inner,
  &:focus &__inner {
    transform: scale(0.95);
  }

  &__arrow {
    --active-lightness: 20%;
    height: 4rem;
    width: auto;

    fill: hsl(var(--theme-color), 10%, 50%);

    path:last-of-type {
      stroke: hsl(var(--theme-color), 10%, 50%);
      stroke-dasharray: 45;
      stroke-dashoffset: -17;
      transition: stroke var(--transition-time)
          var(--transition-function-ease-out),
        stroke-dashoffset var(--transition-time)
          var(--transition-function-ease-out);
    }

    transition: fill var(--transition-time) var(--transition-function-ease-out);
  }

  &:hover &__arrow,
  &:focus &__arrow {
    fill: hsl(var(--theme-color), 10%, var(--active-lightness));

    path:last-of-type {
      stroke-dashoffset: 0;
      stroke: hsl(var(--theme-color), 10%, var(--active-lightness));
    }
  }
}

.dark-mode .project__arrow {
  --active-lightness: 85%;
  fill: hsl(var(--theme-color), 10%, 50%);
}
</style>
