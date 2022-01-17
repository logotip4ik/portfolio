<template>
  <section ref="about" class="about" aria-label="about section">
    <CircleSVG
      v-for="key in 10"
      :key="key"
      ref="aboutCircles"
      class="about__bg-img"
      aria-hidden="true"
    ></CircleSVG>

    <V-H2 :y-offset="{ end: 100 }" aria-label="about section heading">
      About
    </V-H2>

    <p class="about__text" :aria-label="about.text">
      <span class="sr-only">{{ about.text }}</span>
      <!-- eslint-disable -->
      <span
        v-for="(char, key) in about.text"
        :key="key"
        ref="aboutTextChars"
        class="about__text__char"
        v-html="char"
        aria-hidden="true"
      ></span>
      <!-- eslint-enable -->
    </p>

    <ul class="about__tech" aria-label="tech I am using">
      <a
        v-for="(icon, key) in icons"
        :key="key"
        ref="aboutTechItems"
        class="about__tech__item"
        :aria-label="`link to ${icon.svg.slice(0, -3)} website`"
        :href="icon.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <component
          :is="icon.svg"
          class="about__tech__item__svg"
          aria-hidden="true"
        ></component>
      </a>
    </ul>
  </section>
</template>

<script>
import CircleSVG from '~/assets/img/circle.svg?inline'
import NuxtSVG from '~/assets/img/nuxtjs.svg?inline'
import NextSVG from '~/assets/img/nextjs.svg?inline'
import SassSVG from '~/assets/img/sass.svg?inline'
import GsapSVG from '~/assets/img/gsap.svg?inline'

export default {
  // eslint-disable-next-line
  components: { CircleSVG, NuxtSVG, NextSVG, SassSVG, GsapSVG },
  data: () => ({
    about: null,
    icons: [
      { svg: 'NuxtSVG', link: 'https://nuxtjs.org' },
      { svg: 'NextSVG', link: 'https://nextjs.com' },
      { svg: 'SassSVG', link: 'https://sass-lang.com' },
      { svg: 'GsapSVG', link: 'https://greensock.com' },
    ],
  }),
  async fetch() {
    this.about = await this.$content('about', { text: true }).fetch()
  },
  mounted() {
    const { about, aboutCircles, aboutTextChars, aboutTechItems } = this.$refs

    const gsap = this.$gsap

    const colorizer = gsap.utils.interpolate('#303030', '#ffe6ed')

    gsap.set(aboutCircles, {
      width: 'calc(var(--step-5) * random(0.85, 2))',
    })
    gsap.set('circle', { stroke: () => colorizer(Math.random()) })

    const imagesTl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: about,
        start: 'top bottom',
        end: 'bottom+=75% top',
      },
    })

    imagesTl.fromTo(
      aboutCircles,
      { left: 'random(20, 80)%', bottom: 'random(20, 80)%' },
      { bottom: 'random(20, 80)%' },
      0
    )

    // NOTE: Just a scrollTrigger with update wont work, cuz it can skip some elements
    // if user is scrolling to quickly, but timeline can't skip, it will just go forwards
    // and fill up everything even items before that point in time
    const charsTl = gsap.timeline({
      scrollTrigger: { trigger: about, scrub: 1, pin: true, end: '+=100%' },
    })

    aboutTextChars.forEach((char) => {
      charsTl.to(char, {
        onUpdate: () => {
          const fn = charsTl.scrollTrigger.direction > 0 ? 'add' : 'remove'

          char.classList[fn]('about__text__char--active')
        },
      })
    })

    aboutTechItems.forEach((item, i) => {
      charsTl.fromTo(
        item,
        { opacity: 0 },
        { opacity: 1, duration: 10 },
        i * 5 + 150
      )
    })

    setTimeout(() => {
      this.$locomotiveScroll.update()
      document
        .querySelectorAll('.pin-spacer')
        .forEach((el) => el.setAttribute('role', 'presentation'))
    }, 1000)
  },
}
</script>

<style lang="scss">
.about {
  position: relative;

  min-height: 100vh;
  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;
  color: #303030;

  &__text {
    max-width: 1100px;

    font-size: var(--step-0);
    line-height: 1.5;
    letter-spacing: 0.1px;
    text-align: center;

    margin: 0 auto;

    &__char {
      // TODO: decode how better, with animation of color or not
      // wee can not animate the text-stroke, at least in firefox
      -webkit-text-stroke: 0.65px #303030;

      transition: color 100ms ease, -webkit-text-stroke-width 200ms ease;

      @supports (-webkit-text-stroke: 1px #303030) {
        color: white;
      }

      &--active {
        color: #303030;
        -webkit-text-stroke-width: 0.4px;
      }
    }
  }

  &__tech {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--step-3);

    max-width: 1100px;
    list-style-type: none;
    padding-inline-start: 0;
    margin-block-start: 6%;
    margin-inline: auto;

    &__item {
      transition: transform 300ms var(--ease-back);

      &:is(:hover, :focus-visible) {
        transform: scale(0.9);
      }

      &__svg {
        width: 100%;
        max-width: 150px;
        height: auto;

        opacity: 0.75;
        filter: grayscale(1);

        @media screen and (max-width: 500px) {
          max-width: 30vw;
        }
      }
    }
  }

  &__bg-img {
    position: absolute;

    width: calc(var(--step-5) * 2);
    height: auto;

    filter: drop-shadow(0 0 2rem #fff);
  }
}
</style>
