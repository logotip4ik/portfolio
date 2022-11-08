<script setup>
defineProps({ error: { type: Object, required: true } });

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <main id="scroller" class="error-page">
    <p class="error-page__message">
      <template v-if="error.statusCode == 404">
        Oops, it's not what are you searching for.
      </template>
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

    margin-bottom: 1rem;
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

    transition: background-size 0.3s ease, color 0.3s ease;

    &:is(:hover, :focus-visible) {
      color: var(--surface-color);

      background-size: 100% 100%;
    }
  }
}
</style>
