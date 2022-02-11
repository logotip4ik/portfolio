<template>
  <section
    ref="about"
    class="about"
    aria-label="about section"
    data-scroll-section
  >
    <V-H2 aria-label="about section heading">About</V-H2>

    <p ref="aboutText" class="about__text">
      <span class="sr-only">{{ about.text }}</span>
      <!-- eslint-disable -->
      <span
        v-for="(word, key) in aboutWords"
        :key="key"
        ref="aboutTextWords"
        class="about__text__word"
        aria-hidden="true"
        v-html="`${key === 0 ? '' : '&nbsp'}${word}`"
      ></span>
      <!-- eslint-enable -->
    </p>

    <ul class="about__tech" aria-label="tech I am using">
      <li
        v-for="(icon, key) in icons"
        :key="key"
        ref="aboutTechItems"
        v-hoverable
      >
        <a
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
      </li>
    </ul>
  </section>
</template>

<script>
import NuxtSVG from '~/assets/img/nuxtjs.svg?inline'
import NextSVG from '~/assets/img/nextjs.svg?inline'
import SassSVG from '~/assets/img/sass.svg?inline'
import GsapSVG from '~/assets/img/gsap.svg?inline'

export default {
  components: { NuxtSVG, NextSVG, SassSVG, GsapSVG },
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
  computed: {
    aboutWords() {
      return this.about.text.split(' ')
    },
  },
  mounted() {
    const { about, aboutTextWords, aboutText, aboutTechItems } = this.$refs

    const gsap = this.$gsap

    aboutTechItems.forEach((item) => {
      // reveal animation
      gsap.fromTo(
        item,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top-=2% bottom-=12%',
            once: true,
          },
        }
      )

      // parallax animation
      gsap.fromTo(
        item,
        { yPercent: 'random(-5, -10)' },
        {
          yPercent: 'random(5, 10)',
          scrollTrigger: { trigger: about, scrub: true },
        }
      )
    })

    const aboutTextWordsTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutText,
        start: 'top 85%',
        end: '50% 70%',
        scrub: true,
        once: true,
      },
    })

    aboutTextWords.forEach((word) => {
      aboutTextWordsTl.to(word, {
        onUpdate: () => word.classList.add('about__text__word--revealed'),
      })
    })
  },
}
</script>

<style lang="scss">
.about {
  position: relative;

  min-height: 100vh;
  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;
  color: white;
  background-color: var(--black-color);
  pointer-events: all;

  &__text {
    max-width: 1100px;

    color: darken($color: white, $amount: 40);
    font-size: var(--step-0);
    line-height: 1.5;
    letter-spacing: 0.1px;
    text-align: center;

    margin: 0 auto;

    &__word {
      display: inline-block;

      opacity: 0;
      transform: translateY(50%);

      transition: transform 750ms ease, opacity 750ms ease;

      @media (prefers-reduced-motion: reduce) {
        transform: translateY(0%);
      }

      &--revealed {
        opacity: 1;
        transform: translateY(0%);
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
    margin: 6% auto 0;

    &__item {
      display: inline-block;

      cursor: none;
      transition: transform 300ms var(--ease-back);

      &:is(:hover, :focus-visible) {
        transform: scale(0.9);
      }

      &__svg {
        width: 100%;
        max-width: 150px;
        height: auto;

        opacity: 0.75;
        filter: grayscale(1) invert(1);

        @media screen and (max-width: 500px) {
          max-width: 30vw;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        cursor: pointer;
      }
    }

    & > *:last-child svg {
      filter: grayscale(1);
    }
  }

  &__bg-img {
    position: absolute;

    width: calc(var(--step-5) * 2);
    height: auto;

    filter: drop-shadow(0 0 2rem #fff) blur(3px);
  }
}
</style>
