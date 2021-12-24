<template>
  <section class="about">
    <V-H2 class="about__title">/ About</V-H2>
    <p class="about__content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Tortor vitae purus
      faucibus ornare suspendisse sed nisi lacus sed. Scelerisque viverra mauris
      in aliquam sem. Leo vel orci porta non pulvinar neque laoreet. Orci nulla
      pellentesque dignissim enim sit amet. Sit amet mauris commodo quis
      imperdiet. Donec massa sapien faucibus et molestie ac feugiat sed lectus.
      Egestas maecenas pharetra convallis posuere morbi leo urna molestie at.
      Risus commodo viverra maecenas accumsan lacus vel facilisis. Et tortor at
      risus viverra adipiscing at in tellus integer.
    </p>

    <img
      src="/img/blob-3.png"
      alt="floating blob"
      class="about__blob parallax-blob"
    />
  </section>
</template>

<script>
export default {
  name: 'SectionAbout',
}
</script>

<style lang="scss">
.about {
  position: relative;
  isolation: isolate;

  padding: 0 var(--pd-x) 5rem;

  &__title {
    font-weight: 500;
    font-size: clamp(1.25rem, 5vw, 2.25rem);
    margin-bottom: 3rem;
  }

  &__content {
    font-size: calc(1rem + 0.33vw);
    line-height: 1.75;
    color: var(--ff-secondary-color);

    padding-left: 1.25rem;
  }

  &__blob {
    position: absolute;
    right: 0;
    top: 50%;
    z-index: -1;

    width: clamp(10rem, 25vw, 35rem);
    height: auto;

    filter: blur(35px);
  }
}
</style>
