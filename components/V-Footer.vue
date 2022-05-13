<script setup>
import ArrowUpSVG from '~/assets/img/arrow-up.svg';

const { $smoothScroll } = useNuxtApp();
const { gsap } = useGsap();

const socialLinks = [
  { label: 'linkedin', href: 'https://www.linkedin.com/in/bogdankostyuk' },
  { label: 'telegram', href: 'https://t.me/bogdankostyuk' },
  { label: 'github', href: 'https://github.com/logotip4ik' },
  { label: 'email', href: 'mailto:contact@bogdankostyuk.xyz' },
];

const footer = ref(null);
const footerWrapper = ref(null);

function getCurrentYear() {
  return new Date().getFullYear();
}

onMounted(() => {
  const resizeObserver = new ResizeObserver(() =>
    gsap.set(footer.value, {
      '--footer-wrapper-height': `${footerWrapper.value.clientHeight}px`,
    })
  );
  resizeObserver.observe(footer.value);

  setTimeout($smoothScroll.update, 150);
});
</script>

<template>
  <footer ref="footer" class="footer">
    <div ref="footerWrapper" class="footer__wrapper" data-scroll-sticky>
      <div class="footer__content">
        <p class="footer__content__title">
          <span class="footer__content__title__line">Bogdan</span>
          <span
            class="footer__content__title__line footer__content__title__line--pl"
          >
            Kostyuk
          </span>
        </p>
        <ul class="footer__content__social-links">
          <li
            v-for="(link, key) in socialLinks"
            :key="key"
            class="footer__content__social-links__link"
          >
            <VFooterLink v-hoverable.outer-link :href="link.href">
              {{ link.label }}
            </VFooterLink>
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
      <button v-hoverable.action class="footer__arrow">
        <ArrowUpSVG />
      </button>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  height: var(--footer-wrapper-height);

  overflow: hidden;

  &__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;

    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;

    width: 100%;
  }

  &__content {
    flex-basis: 80%;
    flex-grow: 1;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1.5rem;
    row-gap: 4rem;
    align-items: center;

    position: relative;
    width: 100%;

    color: var(--ff-color);

    padding: 2rem clamp(1rem, 4vw, 5rem);
    background: var(--black-color);
    transition: color 400ms, background-color 400ms;

    & > *:nth-child(even) {
      justify-self: end;
      text-align: right;
    }

    &__title {
      font-size: var(--step-4);
      text-align: left;
      line-height: 1.125;

      margin: 0;

      &__line {
        display: block;

        &--pl {
          padding-left: var(--step-4);
        }
      }
    }

    &__social-links {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;

      margin: 0;
      padding: 0;

      list-style-type: none;

      &__links:not(:first-of-type) {
        margin-top: 0.1rem;
      }

      @media screen and (max-width: 685px) {
        align-items: center;
      }
    }

    &__copyright {
      font-size: var(--step-0);
      white-space: nowrap;

      opacity: 0.75;

      margin: 0;
    }

    &__note {
      font-size: var(--step-0);
      white-space: nowrap;

      opacity: 0.75;

      margin: 0;

      img {
        width: var(--step-0);
        height: auto;

        transform: translateY(10%);
      }
    }

    &::after {
      content: '';

      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;

      width: 1px;

      opacity: 0.125;
      background-color: var(--ff-color);

      @media (max-width: 591.5px) {
        content: none;
      }
    }

    @media screen and (max-width: 685px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, min-content);

      row-gap: 1.5rem;

      & > * {
        justify-self: center !important;
        text-align: center !important;
      }
    }
  }

  &__arrow {
    flex-basis: 20%;
    flex-grow: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 115px;

    text-align: center;

    cursor: none;
    border: none;
    background: var(--black-color);

    svg {
      --ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);

      width: 40%;
      height: auto;

      color: var(--ff-color);

      opacity: 0.65;

      transition: opacity 400ms var(--ease-back),
        transform 400ms var(--ease-back);

      @media (max-width: 700px) {
        max-width: 100px;
      }
    }

    &:is(:hover, :focus-visible) {
      svg {
        opacity: 1;

        transform: translateY(-5%) scale(0.95);

        transition-duration: 300ms;
      }
    }
  }

  @media screen and (max-width: 575px) {
    min-height: 30vw;
  }
}
</style>
