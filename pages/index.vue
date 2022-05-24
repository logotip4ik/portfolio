<script setup>
const { $smoothScroll } = useNuxtApp();
const { gsap, ScrollTrigger } = useGsap();

const currentSection = useCurrentSection();

onMounted(() => {
  $smoothScroll.disable();

  // website parts, heading, sections and footer
  const parts = gsap.utils.toArray('header, section, footer');

  parts.forEach((part, key) => {
    ScrollTrigger.create({
      trigger: part,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => (currentSection.value = key),
      onEnterBack: () => (currentSection.value = key),
    });
  });
});

useHead({
  title: 'Front End Developer',
  titleTemplate: 'Bogdan Kostyuk | %s',
  htmlAttrs: { lang: 'en', dir: 'ltr' },
  meta: [
    { lang: 'en' },
    { language: 'English' },
    { property: 'name', name: 'name', content: 'Bogdan Kostyuk' },
    { charset: 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { 'http-equiv': 'Reply-to', content: 'contact@bogdankostyuk.xyz' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      name: 'description',
      content:
        'I will build you website as quick as possible and with high attention to details👌',
    },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'robots', content: 'all' },
    { name: 'theme-color', content: 'var(--surface-color)' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'copyrighted-site-verification', content: 'c552f044f4e41c2b' },
    { property: 'url', name: 'url', content: 'https://bogdankostyuk.xyz' },
    {
      property: 'og:site_name',
      name: 'og:site_name',
      content: 'Bogdan Kostyuk',
    },
    {
      property: 'og:title',
      name: 'og:title',
      content: 'Front End Developer',
    },
    {
      property: 'og:description',
      name: 'og:description',
      content:
        'I will build you website as quick as possible and with high attention to details рџ‘Њ',
    },
    { property: 'og:locale', name: 'og:locale', content: 'en' },
    {
      property: 'og:url',
      name: 'og:url',
      content: 'https://bogdankostyuk.xyz',
    },
    { property: 'og:type', name: 'og:type', content: 'website' },
    {
      property: 'og:image',
      name: 'og:image',
      content: 'https://bogdankostyuk.xyz/logo.png',
    },
    { property: 'og:image:width', name: 'og:image:width', content: '1440' },
    { property: 'og:image:height', name: 'og:image:height', content: '1440' },
  ],
  link: [
    { rel: 'canonical', href: 'https://bogdankostyuk.xyz/' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: 'any' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
});
</script>

<template>
  <div>
    <VNavbar />
    <div class="smooth-scroll-fix">
      <VHeader />
      <main>
        <VProjects />
        <VAboutMe />
        <VContact />
      </main>
    </div>
    <VFooter />
    <VMenu />
  </div>
</template>

<style lang="scss">
.smooth-scroll-fix {
  position: relative;
  z-index: 3;
  pointer-events: all;

  @media screen and (min-width: 1024px) {
    pointer-events: none;
  }
}
</style>
