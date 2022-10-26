import GLSL from 'vite-plugin-glsl';
import SVGLoader from 'vite-svg-loader';

const isDev = process.env.NODE_ENV === 'development';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,

  target: 'static',

  sourcemap: false,

  // nighter head or vueMeta is not working, idk why,
  // but global seo currently is placed in index page
  app: {
    head: {
      htmlAttrs: { lang: 'en', dir: 'ltr' },
      meta: [
        { title: 'Bogdan Kostyuk | Front End Developer' },
        { lang: 'en' },
        { language: 'English' },
        { property: 'name', name: 'name', content: 'Bogdan Kostyuk' },
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { 'http-equiv': 'Reply-to', content: 'contact@bogdankostyuk.xyz' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
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
            'I will build you website as quick as possible and with high attention to details👌',
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
        {
          property: 'og:image:height',
          name: 'og:image:height',
          content: '1440',
        },
      ],
      link: [
        { rel: 'canonical', href: 'https://bogdankostyuk.xyz/' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          sizes: 'any',
        },
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
    },
  },

  css: [
    'normalize.css/normalize.css',
    'locomotive-scroll/dist/locomotive-scroll.css',
    '~/assets/fonts/styles.css',
    '~/assets/styles/global.css',
  ],

  build: {
    transpile: ['gsap'],
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/fontaine',
    '@logotip4ik_/nuxt-cloudflare-headers',
  ],

  cloudflareHeaders: {
    '/*': [
      { 'X-Robots-Tag': 'all' },
      { 'X-Frame-Options': 'DENY' },
      { 'X-Content-Type-Options': 'nosniff' },
      { 'Referrer-Policy': 'no-referrer' },
      { 'Permissions-Policy': 'document-domain=()' },
    ],
  },

  vite: {
    plugins: [GLSL({ compress: !isDev }), SVGLoader({ svgo: false })],
  },

  nitro: { prerender: { routes: ['/sitemap.xml'] } },
});
