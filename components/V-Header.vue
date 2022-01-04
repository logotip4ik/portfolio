<template>
  <header class="header">
    <V-Header-Background class="header__canvas" />
    <div class="header__container">
      <h1 class="header__container__title">
        Bogdan<br /><span class="ml-responsive serif">Kostyuk</span>
      </h1>
      <p class="header__container__subtitle">Front End Developer</p>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
.header {
  position: relative;
  isolation: isolate;

  width: 100%;
  min-height: 100vh;
  background-color: #0e0d0d;

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
  }

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;

    color: white;
    mix-blend-mode: difference;

    transform: translate(-50%, -50%);

    &__title {
      margin-bottom: 1rem;
    }
    &__subtitle {
      text-align: center;
    }
  }
}
</style>
