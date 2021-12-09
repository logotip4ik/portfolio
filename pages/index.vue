<template>
  <main class="main">
    <button
      :title="$colorMode.preference"
      aria-label="color theme toggle"
      class="main__theme-toggle"
      @click="toggleColorTheme()"
    >
      <transition mode="out-in" name="fade">
        <SystemSvg v-if="$colorMode.preference === 'system'" key="0" />
        <SunSvg v-else-if="$colorMode.preference === 'light'" key="1" />
        <MoonSvg v-else-if="$colorMode.preference === 'dark'" key="2" />
      </transition>
    </button>
    <h1 class="main__heading">Hello.</h1>
    <h2 class="main__name">My name is Bogdan Kostyuk.</h2>
    <p class="main__about">
      I am an independent young software developer. My main sphere of work is a
      web. You can view the source code or visit hosted demo versions on my
      <a href="https://github.com/logotip4ik" target="_blank">GitHub</a>. I am
      able to create complicated ui's as well as the design and program back-end
      of web apps.
      <br />
      <br />
      Most of the time I spend programing with
      <a href="https://v3.vuejs.org/" target="_blank">Vue.js</a>, but also I
      know <a href="https://reactjs.org/" target="_blank">React.js</a>.&nbsp;
      Also recently I discovered server side rendering (SSR) when was playing
      around with frameworks called
      <a href="https://nextjs.org" target="_blank">Next.js</a> and
      <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>
      <br />
      <br />
      Outside of the programing world, I am learning in
      <a href="https://lpnu.ua/en" target="_blank">Lviv Polytechnic</a>. I like
      listening to music, watching
      <a href="https://www.formula1.com/" target="_blank">Formula 1</a> and
      films, playing chess. Also, I enjoy collecting watches and reading
      dystopian books.
    </p>
  </main>
</template>

<script>
import SunSvg from '~/assets/img/sun.svg?inline'
import MoonSvg from '~/assets/img/moon.svg?inline'
import SystemSvg from '~/assets/img/system.svg?inline'

export default {
  components: { SunSvg, MoonSvg, SystemSvg },
  data: () => ({
    colorModeIdx: 0,
    colorModes: ['system', 'light', 'dark'],
  }),
  mounted() {
    this.colorModeIdx = this.colorModes.indexOf(this.$colorMode.value)
  },
  methods: {
    toggleColorTheme() {
      this.colorModeIdx = (this.colorModeIdx + 1) % this.colorModes.length
      this.$colorMode.preference = this.colorModes[this.colorModeIdx]
    },
  },
}
</script>

<style lang="scss">
.main {
  padding: 8rem 5vw 2rem;

  &__theme-toggle {
    --btn-size: 2.5rem;
    --br-radius: 0.25rem;

    display: grid;
    place-items: center;

    position: absolute;
    top: 4rem;
    right: 4vw;

    width: var(--btn-size);
    height: var(--btn-size);

    border: none;
    border-radius: var(--br-radius);
    background-color: transparent;

    transform: translateY(-50%);
    cursor: pointer;

    &::after {
      content: '';

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      opacity: 0;
      border-radius: var(--br-radius);
      box-shadow: 0 0 30px rgba($color: hsl(0, 0%, 20%), $alpha: 0.25);

      transition: opacity var(--transition-time) var(--transition-function);
    }

    svg {
      transform: scale(1);
      transition: opacity var(--transition-time) var(--transition-function),
        transform var(--transition-time) var(--transition-function);
    }

    &:hover {
      &::after {
        opacity: 1;
        transition: opacity 200ms var(--transition-function);
      }

      svg {
        transform: scale(1.05);
        transition: opacity var(--transition-time) var(--transition-function),
          transform 100ms var(--transition-function);
      }
    }
  }

  &__heading {
    font-size: 3.5rem;
    margin-bottom: 0.125rem;
  }

  &__name {
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  &__about {
    font-size: 1.125rem;
    line-height: 1.75;
    max-width: 36rem;
  }
}
</style>
