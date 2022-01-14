<template>
  <section ref="about" class="about">
    <CircleSVG
      v-for="key in 10"
      :key="key"
      ref="aboutCircles"
      class="about__bg-img"
    ></CircleSVG>

    <V-H2>About</V-H2>

    <nuxt-content :document="about" class="about__text"></nuxt-content>

    <ul class="about__tech">
      <component
        :is="icon"
        v-for="(icon, key) in icons"
        :key="key"
        class="about__tech__item"
      ></component>
      <!-- <NuxtSVG ref="sectionImageNuxt" class="about__tech__item"></NuxtSVG>
      <NextSVG ref="sectionImageNext" class="about__tech__item"></NextSVG> -->
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
    icons: ['NuxtSVG', 'NextSVG', 'SassSVG', 'GsapSVG'],
  }),
  async fetch() {
    this.about = await this.$content('about').fetch()
  },
  mounted() {
    const { about, aboutCircles } = this.$refs

    const gsap = this.$gsap
    // const ScrollTrigger = this.$ScrollTrigger

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
      { left: 'random(10, 90)%', bottom: 'random(20, 80)%' },
      { bottom: 'random(20, 80)%' },
      0
    )

    // imagesTl.fromTo(
    //   [sectionImageNuxt, sectionImageNext],
    //   { opacity: 0 },
    //   { opacity: 0.5, stagger: 0.075 },
    //   '<75%'
    // )

    // ScrollTrigger.create({
    //   trigger: about,
    //   pin: true,
    //   end: '+=50%',
    // })
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

    margin: 0 auto;
    text-align: center;

    p {
      font-size: var(--step--1);
      line-height: 1.75;
      letter-spacing: 0.1px;
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

  &__bg-img {
    position: absolute;

    width: calc(var(--step-5) * 2);
    height: auto;

    filter: drop-shadow(0 0 2rem #fff);
  }
}
</style>
