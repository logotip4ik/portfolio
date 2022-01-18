<template>
  <footer ref="footer" class="footer">
    <div class="footer__content">
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
          <a :href="link.href" target="_blank" rel="noopener noreferrer">
            {{ link.label }}
          </a>
        </li>
      </ul>
      <p class="footer__content__copyright">
        Copyright © {{ getCurrentYear() }} BK
      </p>
      <p class="footer__content__note">
        Made with <img src="~/assets/img/heart.png" alt="heart icon" /> in
        Ukraine
      </p>
    </div>
    <div
      class="footer__arrow__wrapper"
      role="button"
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
  display: grid;
  grid-template-columns: 1fr calc(15% + 1vw);

  &__content {
    --secondary-color: #{color.adjust($color: #fff, $lightness: -25)};

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
          font-size: calc(var(--step--1) + 0.1rem);
          text-transform: uppercase;
          text-decoration: none;
          color: whitesmoke;
          letter-spacing: 0.4px;

          transition: color 100ms;

          &:is(:hover, :focus) {
            color: darken($color: #ffe6ed, $amount: 5);
          }
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
  }

  &__arrow {
    width: 40%;
    height: auto;
    color: #303030;

    transition: transform 300ms, color 300ms;

    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      &:is(:focus, :hover) {
        svg {
          transform: scale(0.9) translateY(-15px);
          color: black;
        }
      }
    }
  }
}
</style>
