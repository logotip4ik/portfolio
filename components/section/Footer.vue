<template>
  <footer ref="footer" class="footer">
    <div class="footer__content">
      <p class="footer__content__name">Bogdan Kostyuk</p>
      <p class="footer__content__copyright">
        © {{ getCurrentYear() }}<br />
        Made in Ukraine with
        <nuxt-img src="images/heart.png" width="20" height="20" />
      </p>
    </div>
    <div class="footer__scroll-top">
      <ArrowRight class="footer__scroll-top__arrow" />
      <p class="footer__scroll-top__text">To Top</p>
    </div>
  </footer>
</template>

<script>
import ArrowRight from '~/assets/img/arrow-right-footer.svg?inline'

export default {
  components: { ArrowRight },
  mounted() {
    const gsap = this.$gsap

    const { footer } = this.$refs

    const getOffset = () =>
      document.documentElement.clientHeight - footer.clientHeight + 1850

    gsap.fromTo(
      footer,
      { yPercent: -70, opacity: 0.25 },
      {
        yPercent: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: footer,
          start: () => `top+=${getOffset()} bottom`,
          end: () => `bottom+=${getOffset()} bottom`,
          scrub: 1.25,
          invalidateOnRefresh: true,
        },
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

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;

  width: 100%;

  &__content {
    flex: 1;

    padding: 5vh 5vw;

    &__name {
      font-family: 'Merriweather', serif;
      font-size: calc(2.5rem + 0.33vw);
    }

    &__copyright {
      img {
        transform: translateY(25%);
      }
    }
  }

  &__scroll-top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    max-width: clamp(6.5rem, 15vw, 12rem);

    color: var(--surface-color);
    background-color: var(--ff-color);
    box-shadow: inset 10px 0px 10px 1px rgba($color: #000000, $alpha: 0.125);
    cursor: pointer;

    &__text {
      font-size: calc(1.5rem + 0.33vw);

      writing-mode: vertical-lr;
      transform: rotate(180deg);
    }

    &__arrow {
      color: var(--surface-color);
      writing-mode: vertical-lr;
      transform: rotate(-90deg) translateY(0.125rem);
    }
  }
}
</style>
