<template>
  <main class="main">
    <h1 class="main__heading">Hello.</h1>
    <h2 class="main__name">My name is Bogdan Kostyuk.</h2>
    <p class="main__about">
      I am an independent young software developer. My main sphere of work is a
      web. You can view the source code or visit hosted demo versions on my
      <a href="https://github.com/logotip4ik" target="_blank">GitHub</a>. I am
      able to create complicated ui's as well as the design and program back-end
      of web apps.
    </p>

    <p class="main__about">
      Most of the time I spend programing with
      <a href="https://v3.vuejs.org/" target="_blank">Vue.js</a>, but also I
      know <a href="https://reactjs.org/" target="_blank">React.js</a>.&nbsp;
      Also recently I discovered server side rendering (SSR) when was playing
      around with frameworks called
      <a href="https://nextjs.org" target="_blank">Next.js</a> and
      <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>
    </p>

    <p class="main__about">
      Outside of the programing world, I am learning in
      <a href="https://lpnu.ua/en" target="_blank">university</a>. I like
      listening to music, watching
      <a href="https://www.formula1.com/" target="_blank">Formula 1</a> and
      films, playing chess. Also, I enjoy collecting watches and reading
      dystopian books.
    </p>

    <Blob :max-right-pos="25" :max-bottom-pos="25" />
  </main>
</template>

<script>
export default {}
</script>

<style lang="scss">
.main {
  position: relative;
  isolation: isolate;

  &__name {
    font-size: 2.5rem;
    margin-bottom: 0 0 3rem;
  }

  &__about {
    font-size: 1.4rem;
    line-height: 1.75;
    max-width: 47rem;
  }
}
</style>
