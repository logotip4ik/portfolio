<template>
  <header class="header">
    <h1 ref="headerTitle" class="header__title">
      <div class="header__title__line header__title__line--1">
        <span class="content">I am a Front end</span>
        <span class="underline" />
      </div>
      <div class="header__title__line header__title__line--2">
        <span class="content">Developer. My name is</span>
        <span class="underline" />
      </div>
      <div class="header__title__line header__title__line--3 bold">
        <span class="content">Bogdan Kostyuk</span>
        <span class="underline" />
      </div>
    </h1>

    <p ref="headerTime" class="header__time">Київ {{ ukraineTime }}</p>

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
  data() {
    return {
      ukraineTime: this.getDate(),
    }
  },
  mounted() {
    const gsap = this.$gsap

    const loader = document.querySelectorAll('.loader')
    const loaderTextChars = document.querySelectorAll('.loader__content__char')
    const headerTextLines = document.querySelectorAll('.header__title__line')
    const headerTextLinesContent = document.querySelectorAll(
      '.header__title__line .content'
    )
    const headerTextUnderlines = document.querySelectorAll(
      '.header__title__line .underline'
    )
    const headerTime = document.querySelectorAll('.header__time')
    const blobs = document.querySelectorAll('.parallax-blob')

    const tl = gsap.timeline({ delay: 0.15, default: { duration: 0.5 } })

    tl.fromTo(
      loaderTextChars,
      { opacity: 1, yPercent: 100 },
      { yPercent: 0, stagger: 0.025 }
    )

    tl.fromTo(
      loaderTextChars[0].parentElement,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.5, ease: 'power4.in' }
    )

    tl.fromTo(
      loader,
      { opacity: 1, filter: 'blur(0px)' },
      { opacity: 0, delay: 0.25, filter: 'blur(100px)' },
      '<+0.1'
    )

    tl.set(loader, { display: 'none', duration: 0 })

    tl.fromTo(
      headerTextUnderlines,
      { right: '100%', opacity: 1 },
      { right: '0%', opacity: 1, stagger: 0.25 }
    )

    tl.fromTo(
      headerTextLinesContent,
      { yPercent: 120, rotate: -5, opacity: 1 },
      { yPercent: 0, rotate: 0, opacity: 1, duration: 0.75, stagger: 0.25 },
      '<+0.25'
    )

    tl.to(headerTextLines, {
      y: (i) => (headerTextLines.length - i) * -10,
      scrollTrigger: { scrub: 0.75, start: 'top top' },
    })

    tl.fromTo(
      headerTextUnderlines,
      { left: '0%' },
      { left: '100%', stagger: 0.25 },
      '<-0.625'
    )

    tl.fromTo(blobs, { opacity: 0 }, { opacity: 1, stagger: 0.05 }, '<+0.25')

    tl.fromTo(headerTime, { opacity: 0 }, { opacity: 1 }, '<+0.25')

    setInterval(() => (this.ukraineTime = this.getDate()), 1000)
  },
  methods: {
    getDate() {
      const currentTime = new Date()
      return Intl.DateTimeFormat('uk-ua', {
        timeZone: 'Europe/Kiev',
        hour: '2-digit',
        minute: '2-digit',
      }).format(currentTime)
    },
  },
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: flex-start;
  align-content: center;

  position: relative;
  isolation: isolate;

  min-height: 100vh;

  padding: 0 var(--pd-x);

  &__title {
    margin: auto 0;

    &__line {
      display: inline-block;

      position: relative;

      font-size: clamp(1.5rem, 7vw, 4.75rem);
      font-weight: 300;
      line-height: 1.175;

      margin: 0;
      padding: 0;
      overflow: hidden;

      .content {
        display: inline-block;

        opacity: 0;
      }

      .underline {
        display: inline-block;

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        height: 1px;
        opacity: 0;
        background-color: var(--ff-secondary-color);
      }
    }

    .bold {
      font-weight: 500;
    }
  }

  &__time {
    position: absolute;
    bottom: 2rem;
    left: var(--pd-x);

    font-size: 0.825rem;
    font-variant-numeric: tabular-nums;
    color: var(--ff-secondary-color);
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
