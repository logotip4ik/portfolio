<template>
  <section ref="about" class="about" aria-label="about section">
    <CircleSVG
      v-for="key in 10"
      :key="key"
      ref="aboutCircles"
      class="about__bg-img"
      aria-hidden="true"
    ></CircleSVG>

    <V-H2 aria-label="about section heading">About</V-H2>

    <nuxt-content :document="about" class="about__text"></nuxt-content>

    <!-- <p class="about__text" :aria-label="about.text">
      <span class="sr-only">{{ about.text }}</span>
      <span
        v-for="(char, key) in about.text"
        :key="key"
        ref="aboutTextChars"
        class="about__text__char"
        v-html="char"
        aria-hidden="true"
      ></span>
    </p> -->

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
    this.about = await this.$content('about').fetch()
  },
  mounted() {
    const {
      about,
      aboutCircles,
      // aboutTextChars,
      aboutTechItems,
    } = this.$refs

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
        end: 'bottom top',
      },
    })

    imagesTl.fromTo(
      aboutCircles,
      { left: 'random(20, 80)%', bottom: 'random(20, 80)%' },
      { bottom: 'random(20, 80)%' },
      0
    )

    aboutTechItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=20%',
            once: true,
          },
        }
      )
    })
  },
}
</script>

<style lang="scss">
.about {
  position: relative;

  min-height: 100vh;
  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;
  color: #303030;

  &__text p {
    max-width: 1100px;

    color: #303030;
    font-size: var(--step-0);
    line-height: 1.5;
    letter-spacing: 0.1px;
    text-align: center;

    margin: 0 auto;
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
