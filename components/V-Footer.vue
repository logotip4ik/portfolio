<template>
  <footer ref="footer" class="footer">
    <div ref="footerWrapper" class="footer__wrapper" data-scroll-sticky>
      <div ref="footerContent" class="footer__content">
        <p ref="footerContentTitle" class="footer__content__title">
          Bogdan <br />
          <span class="serif">Kostyuk</span>
        </p>
        <ul class="footer__content__social">
          <li
            v-for="(link, key) in socialLinks"
            :key="key"
            class="footer__content__social__link"
          >
            <V-Footer-Social-Link
              ref="footerContentSocialLinks"
              v-hoverable
              target="_blank"
              :href="link.href"
              :aria-label="`link to ${link.label}`"
            >
              {{ link.label }}
            </V-Footer-Social-Link>
          </li>
        </ul>

        <p class="footer__content__copyright">
          Copyright ©{{ getCurrentYear() }} BK
        </p>
        <p class="footer__content__note">
          Made with
          <img
            title="love"
            loading="lazy"
            src="~/assets/img/heart.png"
            width="60"
            height="60"
            alt="love"
          />
          in
          <img
            title="Ukraine"
            loading="lazy"
            src="~/assets/img/ukraine-flag.png"
            width="70"
            height="70"
            alt="ukraine"
          />
        </p>
      </div>
      <div
        class="footer__arrow__wrapper"
        role="button"
        aria-label="scroll to top"
        tabindex="0"
        @click="$scrollTo(0)"
      >
        <ArrowUpSVG aria-label="up arrow" class="footer__arrow"></ArrowUpSVG>
      </div>
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
    const prefersReducedMotion = this.$prefersReducedMotion()

    const { footer, footerWrapper, footerContentTitle } = this.$refs

    const gsap = this.$gsap

    const resizeObserver = new ResizeObserver(this.setFooterWrapperHeightVar)
    resizeObserver.observe(footerWrapper)
    this.setFooterWrapperHeightVar()

    if (!prefersReducedMotion)
      gsap.fromTo(
        footerContentTitle,
        { '--x-offset': '0%' },
        {
          '--x-offset': '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: `bottom-=${footerContentTitle.offsetHeight} bottom`,
            end: `bottom bottom`,
            scrub: true,
          },
        }
      )
  },
  methods: {
    setFooterWrapperHeightVar() {
      this.$gsap.set(this.$refs.footer, {
        '--wrapper-height': `${this.$refs.footerWrapper.offsetHeight}px`,
        onEnd: () => this.$locomotiveScroll.update(),
      })
    },
    getCurrentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="scss">
@use 'sass:color';

@mixin visible-after {
  content: '';

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  @media (prefers-reduced-motion: reduce) {
    content: none;
  }
}

.footer {
  height: var(--wrapper-height);
  overflow: hidden;

  &__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;

    pointer-events: all;
  }

  &__content {
    --secondary-color: #{color.adjust($color: #fff, $lightness: -25%)};

    flex-basis: 80%;
    flex-grow: 1;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    align-items: center;

    position: relative;

    width: 100%;

    color: whitesmoke;
    padding: 2rem clamp(1rem, 4vw, 5rem) 3rem;
    background: var(--black-color);

    transition: color 400ms, background-color 400ms;

    & > *:nth-child(even) {
      justify-self: end;
      text-align: right;
    }

    &__title {
      --x-offset: 0px;
      display: inline-block;

      position: relative;

      font-size: var(--step-4);

      margin: 0;
      width: min-content;

      overflow: hidden;

      .serif {
        display: inline-block;

        position: relative;

        margin-inline-start: calc(var(--step-5) / 2);

        &::after {
          @include visible-after;

          // NOTE: #030303 - main black color
          background-color: rgba($color: #030303, $alpha: 0.75);

          transform: translateX(var(--x-offset));

          @media (prefers-color-scheme: light) {
            background-color: rgba($color: #ebebeb, $alpha: 0.75);
          }
        }
      }

      &::after {
        @include visible-after;

        bottom: calc(50% - 5px);

        // NOTE: #030303 - main black color
        background-color: rgba($color: #030303, $alpha: 0.65);

        transform: translateX(var(--x-offset));

        @media (prefers-color-scheme: light) {
          background-color: rgba($color: #ebebeb, $alpha: 0.75);
        }
      }
    }

    &__social {
      list-style-type: none;
      margin: 0;
      padding-inline-start: 0;

      &__link {
        margin: 1rem 0;

        a {
          font-size: calc(var(--step--2) + 0.1rem);
          text-transform: uppercase;
          text-decoration: none;
          color: whitesmoke;

          transition: color 400ms;

          @media (prefers-color-scheme: light) {
            color: #030303;
          }
        }
      }
    }

    &__copyright {
      color: var(--secondary-color);
      margin: 0;
    }

    &__note {
      color: var(--secondary-color);
      margin: 0;

      img {
        width: var(--step--1);
        height: auto;
        transform: translateY(20%);

        &:last-of-type {
          width: calc(var(--step--1) + 0.15rem);
        }
      }
    }

    &::after {
      content: '';

      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;

      width: 1px;

      background-color: rgba($color: white, $alpha: 0.125);
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, fit-content);

      & > * {
        justify-self: center !important;
        text-align: center !important;
      }
    }

    @media (prefers-color-scheme: light) {
      --secondary-color: #{color.adjust($color: #030303, $lightness: 35%)};

      color: #030303;
    }
  }

  &__arrow {
    width: 40%;
    max-width: min(15vw, 130px);
    height: auto;
    color: darken($color: white, $amount: 40);

    transition: transform 300ms, opacity 300ms;

    &__wrapper {
      flex-basis: 20%;
      flex-grow: 1;

      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 115px;
      background: var(--black-color);
      cursor: pointer;

      &:is(:focus, :hover) {
        svg {
          transform: scale(0.9) translateY(-15px);
          opacity: 0.75;
        }
      }

      @media (prefers-color-scheme: light) {
        svg {
          opacity: 0.75;
        }

        &:is(:focus, :hover) {
          svg {
            transform: scale(0.9) translateY(-15px);
            opacity: 1;
          }
        }
      }
    }

    @media screen and (max-width: 575px) {
      min-height: 30vw;
      color: whitesmoke;
    }

    @media (prefers-color-scheme: light) {
      color: #303030;
    }
  }
}
</style>
