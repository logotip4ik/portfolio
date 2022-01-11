<template>
  <header ref="header" class="header" @mousemove="setMousePos">
    <V-Header-Background :mouse-pos="mousePos" class="header__canvas" />
    <div ref="headerContainer" class="header__container">
      <h1 class="header__container__title">
        <span class="line">
          <span class="line__content">Bogdan</span>
        </span>
        <span class="line">
          <span class="line__content ml-responsive serif">Kostyuk</span>
        </span>
      </h1>
      <p class="header__container__subtitle">
        <!-- eslint-disable -->
        <span
          v-for="(char, key) in subTitleChars"
          :key="key"
          ref="headerContainerSubtitle"
          v-html="char"
        ></span>
        <!-- eslint-enable -->
      </p>
    </div>
    <p ref="headerClock" class="header__clock">
      <span>Kyiv</span>
      <span>{{ localTime }}</span>
    </p>
    <!-- TODO: add some sort of "scroll down" indication, see monopo.nyc -->
  </header>
</template>

<script>
import { Vector2 } from 'three'

export default {
  data() {
    return {
      mousePos: new Vector2(0, 0),
      localTime: this.getLocalTime(),
      subTitleText: 'Front End Developer',
    }
  },
  computed: {
    subTitleChars() {
      return this.subTitleText.split('')
    },
  },
  mounted() {
    const { headerContainer, headerClock, headerContainerSubtitle } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      headerContainer,
      { opacity: 1, scale: 1, yPercent: 0, filter: 'blur(0px)' },
      {
        opacity: 0,
        scale: 1.125,
        yPercent: -10,
        filter: 'blur(10px)',
        scrollTrigger: {
          scrub: 0.75,
          trigger: headerContainer.parentElement,
          start: 'top+=15% top',
          end: 'bottom-=35%, top',
        },
      }
    )

    gsap.fromTo(
      headerClock,
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          scrub: 0.75,
          trigger: headerClock.parentElement,
          start: 'top+=25% top',
          end: 'bottom-=25% top',
        },
      }
    )

    const tl = gsap.timeline({ paused: true, delay: 0.25 })

    // NOTE: Yeah, i know, i shouldn't use plain selectors
    // but really, this is working and if you wanted to use refs, then
    // it will became really painful for developer
    tl.fromTo(
      '.line__content',
      { yPercent: 105 },
      { yPercent: 0, ease: 'power1.out', duration: 1, stagger: 0.125 }
    )
    tl.fromTo(
      headerContainerSubtitle,
      { opacity: 0 },
      { opacity: 1, stagger: { amount: 0.5, from: 'center' } },
      '-=0.75'
    )
    tl.fromTo(
      '.nav__navigation__item',
      { opacity: 0 },
      { opacity: 1, stagger: { amount: 0.25, from: 'end' } },
      '-=0.5'
    )
    tl.fromTo(headerClock, { opacity: 0 }, { opacity: 1 }, '<+0.125')

    // NOTE: this even is fired when loader is done with animation
    this.$nuxt.$on('show-layout', () => tl.play())

    gsap.ticker.add(() => {
      // NOTE: this will make circle collapse back to it's original position
      const newMousePosX = this.mousePos.x - this.mousePos.x / 30
      const newMousePosY = this.mousePos.y - this.mousePos.y / 30

      this.mousePos.set(newMousePosX, newMousePosY)
    })

    setInterval(() => (this.localTime = this.getLocalTime()), 1000)
  },
  methods: {
    setMousePos({ clientX, clientY }) {
      this.mousePos.setX(clientX / this.$refs.header.clientWidth - 0.5)
      this.mousePos.setY((clientY / this.$refs.header.clientHeight - 0.5) * -1)
    },
    getLocalTime() {
      return Intl.DateTimeFormat('uk-UA', {
        timeZone: 'Europe/Kiev',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date())
    },
  },
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  isolation: isolate;

  width: 100%;
  min-height: 100vh;
  // min-height: calc(var(--vh, 1vh) * 100);
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
    color: white;
    mix-blend-mode: difference;

    &__title {
      margin-bottom: 1.5rem;

      line-height: 1.125;
    }

    &__subtitle {
      font-size: var(--step--1);
      text-align: center;
    }
  }

  &__clock {
    position: absolute;
    bottom: clamp(1rem, 5vw, 2rem);
    left: clamp(1rem, 5vw, 2rem);

    color: grey;
  }
}

.line {
  display: block;
  overflow: hidden;

  &__content {
    display: inline-block;
  }
}
</style>
