<template>
  <section ref="section" class="about">
    <h2 class="about__title serif">About</h2>

    <TriangleSvg ref="sectionImageTriangle" class="about__img"></TriangleSvg>
    <RectangleSvg ref="sectionImageRectangle" class="about__img"></RectangleSvg>

    <nuxt-content :document="about" class="about__text"></nuxt-content>
  </section>
</template>

<script>
import TriangleSvg from '~/assets/img/triangle.svg?inline'
import RectangleSvg from '~/assets/img/rectangle.svg?inline'

export default {
  components: { TriangleSvg, RectangleSvg },
  data: () => ({ about: null }),
  async fetch() {
    this.about = await this.$content('about').fetch()
  },
  mounted() {
    const { section, sectionImageTriangle, sectionImageRectangle } = this.$refs

    const gsap = this.$gsap

    const backgroundTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scrub: 1,
      },
    })

    backgroundTl.to('body', { backgroundColor: '#0e0d0d' })
    backgroundTl.to('body', { backgroundColor: '#fff' })

    const colorizer = gsap.utils.interpolate('#ffffff', '#ffe6ed')

    gsap.set([sectionImageTriangle, sectionImageRectangle], {
      width: 'calc(var(--step-5) * random(1, 2))',
    })
    gsap.set('rect', { stroke: () => colorizer(Math.random()) })

    const imagesTl = gsap.timeline({
      scrollTrigger: {
        scrub: 2,
        trigger: section,
        end: 'bottom top',
      },
    })

    imagesTl.fromTo(
      sectionImageTriangle,
      { left: 'random(0, 30)%', bottom: 'random(20, 40)%' },
      { bottom: 'random(50, 60)%', rotate: 'random(10, 270)' },
      0
    )
    imagesTl.fromTo(
      sectionImageRectangle,
      { right: 'random(0, 30)%', bottom: 'random(20, 30)%' },
      { bottom: 'random(70, 100)%', rotate: 'random(100, 360)' },
      0
    )
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

    p {
      font-size: var(--step--1);
      line-height: 1.75;
      letter-spacing: 0.1px;
    }
  }

  &__img {
    position: absolute;

    width: calc(var(--step-5) * 2);
    height: auto;

    filter: drop-shadow(0 0 2rem #fff);
  }
}
</style>
