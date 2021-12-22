<template>
  <header class="header">
    <h1 ref="headerTitle" class="header__title">
      Hello. <br />
      I am Frontend Developer<br />
      My name is <span class="bold">Bogdan Kostyuk</span>
    </h1>

    <img
      src="/img/blob-1.png"
      alt="floating blob 1"
      class="header__blob parallax-blob"
    />
  </header>
</template>

<script>
export default {
  name: 'SectionHeader',
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: flex-start;
  align-content: center;

  position: relative;
  isolation: isolate;

  min-height: 85vh;

  padding: 0 var(--pd-x);

  &__title {
    margin: auto 0;

    font-size: clamp(1.5rem, 6vw, 4.5rem);
    font-weight: 300;

    .bold {
      font-weight: 500;
    }
  }

  &__blob {
    display: block;

    position: absolute;
    right: 5%;
    top: 20%;
    z-index: -1;

    width: clamp(10rem, 30vw, 40rem);
    height: auto;

    filter: blur(35px);
    pointer-events: none;
  }
}
</style>
