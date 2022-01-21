<template>
  <footer ref="footer" class="footer">
    <div ref="footerContent" class="footer__content">
      <p class="footer__content__title">
        Bogdan <br />
        <span class="serif">Kostyuk</span>
      </p>
      <ul class="footer__content__social">
        <li
          v-for="(link, key) in socialLinks"
          :key="key"
          class="footer__content__social__link"
        >
          <V-Footer-Social-Link target="_blank" :href="link.href">
            {{ link.label }}
          </V-Footer-Social-Link>
        </li>
      </ul>

      <p class="footer__content__copyright">
        Copyright © {{ getCurrentYear() }} BK
      </p>
      <p class="footer__content__note">
        Made with
        <img
          src="~/assets/img/heart.png"
          width="60"
          height="60"
          alt="heart icon"
        />
        in Ukraine
      </p>
    </div>
    <div
      class="footer__arrow__wrapper"
      role="button"
      aria-label="scroll to top"
      tabindex="0"
      @click="$scrollTo(0)"
    >
      <ArrowUpSVG class="footer__arrow"></ArrowUpSVG>
    </div>
  </footer>
</template>

<script>
import ArrowUpSVG from '~/assets/img/arrow-up.svg?inline'

export default {
  components: { ArrowUpSVG },
  data: () => ({
    socialLinks: [
      {
        label: 'linkedin',
        href: 'https://www.linkedin.com/in/bogdankostyuk',
      },
      { label: 'telegram', href: 'https://t.me/bogdankostyuk' },
      { label: 'github', href: 'https://github.com/logotip4ik' },
      { label: 'email', href: 'mailto:contact@bogdankostyuk.xyz' },
    ],
  }),
  mounted() {
    const { footer, footerContent } = this.$refs

    const gsap = this.$gsap

    gsap.fromTo(
      footerContent,
      { opacity: 0.75, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: { trigger: footer, end: 'bottom bottom', scrub: 0.75 },
      }
    )
  },
  methods: {
    getCurrentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="scss">
@use 'sass:color';

.footer {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-grow: 1;
  flex-wrap: wrap;

  transition: background-color 100ms;

  &__content {
    --secondary-color: #{color.adjust($color: #fff, $lightness: -25%)};

    flex-basis: 80%;
    flex-grow: 1;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;

    width: 100%;

    color: whitesmoke;
    padding: 3rem clamp(1rem, 4vw, 5rem);
    background: var(--black-color);
    box-shadow: 5px -5px 1rem rgba($color: #000000, $alpha: 0.125);

    & > *:nth-child(even) {
      justify-self: end;
      text-align: right;
    }

    &__title {
      font-size: var(--step-4);

      .serif {
        margin-inline-start: calc(var(--step-5) / 2);
      }
    }

    &__social {
      list-style-type: none;
      padding-inline-start: 0;

      &__link {
        margin-block: 1rem;

        a {
          font-size: calc(var(--step--2) + 0.1rem);
          text-transform: uppercase;
          text-decoration: none;
          color: whitesmoke;
        }
      }
    }

    &__copyright {
      color: var(--secondary-color);
    }
    &__note {
      color: var(--secondary-color);

      img {
        width: var(--step--1);
        height: auto;
        transform: translateY(20%);
      }
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, fit-content);

      & > * {
        justify-self: center !important;
        text-align: center !important;
      }
    }
  }

  &__arrow {
    width: 40%;
    max-width: min(15vw, 130px);
    height: auto;
    color: #303030;

    transition: transform 300ms, opacity 300ms;

    &__wrapper {
      flex-basis: 20%;
      flex-grow: 1;

      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 115px;
      cursor: pointer;

      &:is(:focus, :hover) {
        svg {
          transform: scale(0.9) translateY(-15px);
          opacity: 0.75;
        }
      }
    }

    @media screen and (max-width: 575px) {
      min-height: 30vw;
      color: whitesmoke;
    }
  }

  @media screen and (max-width: 575px) {
    background-image: linear-gradient(
      to top,
      var(--black-color) 0%,
      var(--black-color) 40%,
      rgba($color: #fff, $alpha: 0) 80%,
      rgba($color: #fff, $alpha: 0) 100%
    );
  }
}
</style>
