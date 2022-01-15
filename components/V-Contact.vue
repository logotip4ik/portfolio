<template>
  <section class="contact">
    <a
      href="mailto:contact@bogdankostyuk.xyz"
      rel="noreferrer noopener"
      class="contact__link"
    >
      <ContactText class="contact__link__svg"></ContactText>
    </a>
  </section>
</template>

<script>
import ContactText from '~/assets/img/contact-text.svg?inline'

export default {
  components: { ContactText },
}
</script>

<style lang="scss">
.contact {
  padding: 4rem clamp(1rem, 7vw, 5rem) 4rem;

  &__link {
    display: block;

    opacity: 0.5;
    margin: 0 auto;
    transition: transform 300ms var(--ease-back);

    &:is(:hover, :focus-visible) {
      transform: scale(0.95);
    }

    &__svg {
      width: 100%;

      padding-inline-start: 1.25rem;
      padding-inline-end: 0.75rem;
    }
  }
}
</style>
