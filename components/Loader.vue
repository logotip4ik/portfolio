<template>
  <div class="loader">
    <p class="loader__content">
      <span
        v-for="(char, key) in loaderTextSplitted"
        :key="key"
        class="loader__content__char"
        >{{ char }}</span
      >
    </p>
  </div>
</template>

<script>
export default {
  name: 'LoaderComponent',
  data: () => ({
    loaderText: 'Hello.',
  }),
  computed: {
    loaderTextSplitted() {
      return this.loaderText.split('')
    },
  },
}
</script>

<style lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  background-color: var(--surface-color);

  &__content {
    display: inline-block;
    overflow: hidden;

    font-size: calc(3rem + 0.33vw);

    &__char {
      display: inline-block;

      opacity: 0;
    }
  }
}
</style>
