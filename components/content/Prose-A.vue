<script setup>
import ArrowLink from '~/assets/img/arrow-outer-link.svg';

defineProps({
  href: { type: String, required: true, default: '' },
});
</script>

<template>
  <NuxtLink
    v-hoverable.action
    :href="href"
    class="project-link"
    target="_blank"
  >
    <Markdown :use="$slots.default" :unwrap="true" />
    <ArrowLink class="project-link__arrow-svg" />
  </NuxtLink>
</template>

<style lang="scss">
.project-link {
  --size: var(--step--1);

  display: inline-block;

  font: inherit;
  font-size: var(--size);

  color: var(--ff-color);
  text-decoration: none;
  text-transform: lowercase;

  opacity: 0.7;
  cursor: none;

  &__arrow-svg {
    width: var(--size);
    height: auto;

    margin-left: 0.5rem;

    transform: translateY(15%);
  }

  &[no-lowercase] {
    text-transform: none;
  }

  &[size-inherit] {
    display: inline-flex;

    font-size: inherit;

    height: min-content;

    .project-link__arrow-svg {
      transform: scale(1.125);
    }
  }
}
</style>
