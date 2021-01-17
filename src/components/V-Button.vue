<template>
  <button
    :class="{ button: true, 'button--dark': dark }"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
  >
    <slot></slot>
  </button>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'CustomButton',
  setup() {
    const hovering = inject('hovering');

    return {
      hovering,
    };
  },
  props: {
    dark: {
      type: Boolean,
      requried: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  text-transform: uppercase;
  font-size: 1rem;
  font-family: inherit;
  letter-spacing: 2px;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  transition: background-color 150ms ease-out;
  outline: none;
  background-color: #f3f4f6;
  border: 1px solid #bbbbbb;
  box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.15);

  &:hover,
  &:focus {
    background-color: darken($color: #f3f4f6, $amount: 10);
  }

  &--dark {
    color: white;
    background-color: #18181e;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.25);

    &:hover,
    &:focus {
      background-color: lighten($color: #18181e, $amount: 10);
    }
  }
}
</style>
