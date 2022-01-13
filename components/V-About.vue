<template>
  <section ref="section" class="about">
    <CircleSVG
      v-for="key in 10"
      :key="key"
      ref="sectionCircles"
      class="about__bg-img"
    ></CircleSVG>

    <h2 class="about__title serif">About</h2>

    <nuxt-content :document="about" class="about__text"></nuxt-content>

    <ul class="about__tech">
      <NuxtSVG ref="sectionImageNuxt" class="about__tech__item"></NuxtSVG>
      <NextSVG ref="sectionImageNext" class="about__tech__item"></NextSVG>
    </ul>
  </section>
</template>

<script>
import CircleSVG from '~/assets/img/circle.svg?inline'

import NuxtSVG from '~/assets/img/nuxtjs.svg?inline'
import NextSVG from '~/assets/img/nextjs.svg?inline'

export default {
  components: { CircleSVG, NuxtSVG, NextSVG },
  data: () => ({ about: null }),
  async fetch() {
    this.about = await this.$content('about').fetch()
  },
  mounted() {
    const { section, sectionCircles, sectionImageNuxt, sectionImageNext } =
      this.$refs

    const gsap = this.$gsap
    const ScrollTrigger = this.$ScrollTrigger

    const backgroundTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scrub: 1,
        start: '-=100%',
        end: '+=300%',
      },
    })

    backgroundTl.to('body', { backgroundColor: '#0e0d0d' }, 0)
    backgroundTl.to('body', { backgroundColor: '#fff' }, '+=90%')

    const colorizer = gsap.utils.interpolate('#ffffff', '#ffe6ed')

    gsap.set(sectionCircles, {
      width: 'calc(var(--step-5) * random(0.85, 2))',
    })
    gsap.set('circle', { stroke: () => colorizer(Math.random()) })

    const imagesTl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: section,
        start: 'top bottom',
        end: 'bottom+=125% top',
      },
    })

    imagesTl.fromTo(
      sectionCircles,
      { left: 'random(10, 90)%', bottom: 'random(10, 90)%' },
      { bottom: 'random(10, 90)%' },
      0
    )

    imagesTl.fromTo(
      [sectionImageNuxt, sectionImageNext],
      { opacity: 0 },
      { opacity: 0.5, stagger: 0.075 },
      '<75%'
    )

    ScrollTrigger.create({
      trigger: section,
      pin: true,
      end: '+=100%',
    })
  },
}
</script>

<style lang="scss">
.about {
  position: relative;

  min-height: 100vh;
  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;
  color: #dfdfdf;

  &__title {
    text-align: center;
  }

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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    align-items: center;
    justify-items: center;
    gap: var(--step-3);

    list-style-type: none;
    padding-inline-start: 0;

    height: 50%;

    &__item {
      width: 100%;
      max-width: 275px;
      height: auto;

      @media screen and (max-width: 500px) {
        max-width: 60vw;
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
