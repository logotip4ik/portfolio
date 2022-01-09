<template>
  <header class="header">
    <V-Header-Background class="header__canvas" />
    <div ref="headerContainer" class="header__container">
      <h1 class="header__container__title">
        Bogdan<br /><span class="ml-responsive serif">Kostyuk</span>
      </h1>
      <p class="header__container__subtitle">Front End Developer</p>
    </div>
    <p ref="headerClock" class="header__clock">
      <span>Kyiv</span>
      <span>{{ localTime }}</span>
    </p>
    <!-- TODO: add 100vw fix, (css tricks) -->
    <!-- TODO: add some sort of "scroll down" indication, see monopo.nyc -->
  </header>
</template>

<script>
export default {
  data() {
    return {
      localTime: this.getLocalTime(),
    }
  },
  mounted() {
    const { headerContainer, headerClock } = this.$refs

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

    setInterval(() => (this.localTime = this.getLocalTime()), 1000)
  },
  methods: {
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

      line-height: 1;
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
</style>
