<template>
  <main class="main">
    <h1 class="main__heading">
      <span ref="mainHeader">Hello.</span>
    </h1>
    <h2 class="main__name">
      <span ref="mainName">My name is Bogdan Kostyuk.</span>
    </h2>

    <!-- eslint-disable -->
    <p
      v-for="(text, key) in aboutMeText"
      :key="key"
      ref="mainAboutMeTexts"
      class="main__about"
      v-html="text"
    />
    <!-- eslint-enable -->

    <Blob :max-right-pos="25" :max-bottom-pos="25" />
  </main>
</template>

<script>
import { getInitialDelay } from '@/utils'

const aboutMeText = [
  'I am an independent young software developer. My main sphere of work is a web. You can view the source code or visit hosted demo versions on my <a href="https://github.com/logotip4ik" target="_blank">GitHub</a>. I am able to create complicated ui\'s as well as the design and program back-end of web apps.',
  'Most of the time I spend programing with <a href="https://v3.vuejs.org/" target="_blank">Vue.js</a>, but also I know <a href="https://reactjs.org/" target="_blank">React.js</a>.&nbsp; Also recently I discovered server side rendering (SSR) when was playing around with frameworks called <a href="https://nextjs.org" target="_blank">Next.js</a> and <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>',
  'Outside of the programing world, I am learning in <a href="https://lpnu.ua/en" target="_blank">university</a>. I like listening to music, watching <a href="https://www.formula1.com/" target="_blank">Formula 1</a> and films, playing chess. Also, I enjoy collecting watches and reading dystopian books.',
]

export default {
  data: () => ({
    aboutMeText,
  }),
  mounted() {
    const gsap = this.$gsap
    const { mainHeader, mainName, mainAboutMeTexts } = this.$refs

    const tl = gsap.timeline({
      delay: getInitialDelay(),
      defaults: { transformOrigin: 'left top' },
    })

    tl.fromTo(
      mainHeader,
      { yPercent: 110, rotate: 10 },
      { yPercent: 0, rotate: 0 }
    )
    tl.fromTo(
      mainName,
      { yPercent: 120, rotate: 2 },
      { yPercent: 0, rotate: 0 },
      '-=0.3'
    )
    tl.to(mainAboutMeTexts, { opacity: 1, stagger: 0.05 }, '-=0.3')
  },
}
</script>

<style lang="scss">
.main {
  position: relative;
  isolation: isolate;

  &__heading {
    overflow: hidden;
  }

  &__name {
    font-size: 2.5rem;
    margin-bottom: 0 0 3rem;

    overflow: hidden;
  }

  &__about {
    font-size: 1.4rem;
    line-height: 1.75;
    max-width: 47rem;

    opacity: 0;
  }

  span {
    display: inline-block;
  }
}
</style>
