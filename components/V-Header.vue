<template>
  <header ref="header" class="header" role="banner" data-scroll-section>
    <V-Header-Background class="header__canvas" />

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
export default {
  data() {
    return {
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

    const prefersReducedMotion = this.$prefersReducedMotion()

    // NOTE: Yeah, i know, i shouldn't use plain selectors
    // but really, this is working cuz of server side rendering
    // and if you wanted to use refs, then it will be really
    // painful to get every needed element as reference

    // Scroll based animations
    if (!prefersReducedMotion)
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

    if (!prefersReducedMotion)
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

    // MAIN reveal timeline
    const tl = gsap.timeline({
      paused: true,
      delay: 0.25,
      onEnd: () => this.$locomotiveScroll.update(),
    })

    if (prefersReducedMotion)
      tl.fromTo('.line__content', { opacity: 0 }, { opacity: 1, stagger: 0.25 })
    else
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
    tl.fromTo(
      '.nav__sections__list__section, .nav__menu-button',
      { opacity: 0 },
      { opacity: 1, stagger: 0.05 },
      '<+0.75'
    )
    tl.fromTo('.scroll-down', { opacity: 0 }, { opacity: 1 }, '<+0.25')

    // NOTE: this even is fired when loader is done with animation
    this.$nuxt.$on('show-layout', () => tl.play())
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
  max-width: 100vw;
  min-height: 100vh;
  // min-height: calc(var(--vh, 1vh) * 100);
  background-color: var(--black-color);
  pointer-events: all;
  overflow: hidden;

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: -2;
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

  &::before {
    content: '';

    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 25%;
    min-height: 2rem;
    max-height: 11rem;

    background: linear-gradient(
      to top,
      var(--black-color) 0%,
      var(--black-color) 25%,
      rgba(3, 3, 3, 0)
    );
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
