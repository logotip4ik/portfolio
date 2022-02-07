<template>
  <header ref="header" class="header" role="banner" @pointermove="setMousePos">
    <V-Header-Background :mouse-pos="mousePos" class="header__canvas" />

    <div ref="headerContainer" class="header__container">
      <h1 class="header__container__title">
        <span class="sr-only">Bogdan Kostyuk</span>
        <span class="line" aria-hidden="true">
          <span class="line__content">Bogdan</span>
        </span>
        <span class="line" aria-hidden="true">
          <span class="line__content ml-responsive serif">Kostyuk</span>
        </span>
      </h1>

      <div class="header__container__subtitle">
        <p class="sr-only">{{ subTitleText }}</p>
        <!-- eslint-disable -->
        <span
          v-for="(char, key) in subTitleText"
          :key="key"
          ref="headerContainerSubtitle"
          aria-hidden="true"
          v-html="char"
        ></span>
        <!-- eslint-enable -->
      </div>
    </div>

    <div class="header__bottom-bar">
      <V-Clock ref="headerClock" class="header__bottom-bar__clock"></V-Clock>
      <V-Scroll-Down
        class="header__bottom-bar__scroll-down"
        @click.native="$scrollTo('.works')"
      ></V-Scroll-Down>
    </div>
  </header>
</template>

<script>
import { Vector2 } from 'three'

export default {
  data() {
    return {
      mousePos: new Vector2(0, 0),
      links: [
        { label: 'Work', action: () => this.$scrollTo('.works') },
        { label: 'About', action: () => this.$scrollTo('.about') },
        { label: 'Contact', action: () => this.$scrollTo('.contact') },
      ],
      subTitleText: 'Front End Developer',
    }
  },
  mounted() {
    const { header, headerContainer, headerContainerSubtitle } = this.$refs

    const gsap = this.$gsap

    let tl

    // NOTE: why should i do this ?
    // cuz headerNavigationItems already exists in dom,
    // but idk why, nuxt is rerendering them, in the client
    // so previous references is not proper and gsap is
    // animating wrong elements
    setTimeout(() => {
      // Scroll based animations
      gsap.fromTo(
        headerContainer,
        { opacity: 1, scale: 1, yPercent: 0, filter: 'blur(0px)' },
        {
          opacity: 0,
          scale: 1.125,
          yPercent: -10,
          filter: 'blur(10px)',
          scrollTrigger: {
            scrub: 0.5,
            trigger: header,
            start: 'top+=15% top',
            end: 'bottom-=35%, top',
          },
        }
      )

      gsap.fromTo(
        '.scroll-down',
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            scrub: 0.75,
            trigger: header,
            start: 'top+=25% top',
            end: 'bottom-=25% top',
          },
        }
      )

      // MAIN Timeline
      tl = gsap.timeline({
        paused: true,
        delay: 0.25,
        onEnd: () => this.$locoScroll.update(),
      })

      // NOTE: Yeah, i know, i shouldn't use plain selectors
      // but really, this is working and if you wanted to use refs, then
      // it will became really painful for developer
      tl.fromTo(
        '.line__content',
        { yPercent: 105 },
        { yPercent: 0, ease: 'power1.out', duration: 1, stagger: 0.25 }
      )
      tl.fromTo(
        headerContainerSubtitle,
        { opacity: 0 },
        { opacity: 1, stagger: { amount: 0.5, from: 'center' } },
        '-=0.75'
      )
      tl.fromTo('.scroll-down', { opacity: 0 }, { opacity: 1 }, '<+0.75')
      tl.fromTo(
        '.nav__sections__list__section',
        { opacity: 0 },
        { opacity: 1, stagger: 0.05 },
        '<+0.25'
      )
    }, 10)

    // NOTE: this even is fired when loader is done with animation
    this.$nuxt.$on('show-layout', () => tl.play())

    gsap.ticker.add(() => {
      // NOTE: this will make circle collapse back to it's original position
      const newMousePosX = this.mousePos.x - this.mousePos.x / 30
      const newMousePosY = this.mousePos.y - this.mousePos.y / 30

      this.mousePos.set(newMousePosX, newMousePosY)
    })
  },
  methods: {
    setMousePos({ clientX, clientY }) {
      this.mousePos.setX(clientX / this.$refs.header.clientWidth - 0.5)
      this.mousePos.setY((clientY / this.$refs.header.clientHeight - 0.5) * -1)
    },
  },
}
</script>

<style lang="scss">
.header {
  --100vh: calc(100 * var(--vh, 1vh));

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  isolation: isolate;

  width: 100%;
  min-height: 100vh;
  // min-height: calc(var(--vh, 1vh) * 100);
  background-color: var(--black-color);
  overflow-x: hidden;

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

    cursor: default;

    &__title {
      margin-bottom: 1rem;

      line-height: 1.2;

      & > *:last-of-type {
        margin-top: min(-0.5rem, calc(1vw * -1));
      }
    }

    &__subtitle {
      font-size: var(--step--1);
      text-align: center;
    }
  }

  &__bottom-bar {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

    position: absolute;
    top: calc(var(--100vh) - var(--step--1));
    left: var(--x-padding);
    right: var(--x-padding);

    transform: translateY(-100%);

    &__clock {
      display: none;
      color: lighten($color: grey, $amount: 1);
    }

    &__scroll-down {
      color: lighten($color: grey, $amount: 7);
    }
  }

  &__navigation {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;

    font-size: var(--step--1);
    color: white;
    mix-blend-mode: difference;

    width: 100%;

    padding-inline: clamp(1rem, 4vw, 5rem);
    pointer-events: all;
    list-style-type: none;

    & > * {
      position: relative;
    }

    @media screen and (max-width: 512px) {
      width: 100%;
      justify-content: space-between;
    }
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
