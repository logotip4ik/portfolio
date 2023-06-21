<script setup>
const props = defineProps({ error: { type: Object, required: true } });

useHead({
  title: () => props.error.statusCode.toString(),
});

function handleError() {
  clearError({ redirect: '/' });
}
</script>

<template>
  <main id="scroller" class="error-page">
    <p
      class="error-page__message"
      :class="{ 'error-page__message--404': error.statusCode === 404 }"
    >
      <template v-if="error.statusCode == 404">404</template>
      <template v-else>
        {{ error.message }}
      </template>
    </p>

    <NuxtLink
      href="/"
      class="error-page__home-link"
      @click.native.prevent="handleError"
    >
      Maybe to home ?
    </NuxtLink>
  </main>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-height: 100vh;

  &__message {
    font-size: 2rem;
    text-align: center;

    width: calc(100% - 2rem);
    max-width: 35ch;

    transition: background-size 0.5s, color 0.5s, text-shadow 0.5s;

    &--404 {
      font-family: 'e-Ukraine Head';
      font-size: min(calc(30vw + 1rem), 31rem);
      font-variant-numeric: oldstyle-nums;
      font-weight: 100;
      font-style: italic;

      text-shadow: 0 0 2rem #ccc;

      margin-block: max(-10vw, -9rem) 1rem;

      opacity: 0.25;
    }
  }

  &__home-link {
    font-size: 1.75rem;
    text-align: center;
    color: currentColor;
    text-decoration: none;
    line-height: 1.4;

    background-image: linear-gradient(
      to top,
      var(--ff-color) 0%,
      var(--ff-color) 0%
    );
    background-repeat: no-repeat;
    background-size: 100% 1px;
    background-position: 100% 100%;

    transition: background-size 0.3s ease, color 0.4s ease;

    &:is(:hover, :focus-visible) {
      color: var(--surface-color);

      background-size: 100% 100%;
    }
  }
}
</style>
