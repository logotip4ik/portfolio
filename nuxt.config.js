import { isDevelopment } from 'std-env';
import GLSL from 'vite-plugin-glsl';
import SVGLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en', dir: 'ltr' },
      titleTemplate: '%s | Bogdan Kostyuk',
      meta: [
        { lang: 'en' },
        { language: 'English' },
        { property: 'name', name: 'name', content: 'Bogdan Kostyuk' },
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { 'http-equiv': 'Reply-to', content: 'contact@bogdankostyuk.xyz' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'all' },
        { name: 'theme-color', content: 'var(--surface-color)' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'copyrighted-site-verification', content: 'c552f044f4e41c2b' },
        {
          property: 'og:site_name',
          name: 'og:site_name',
          content: 'Bogdan Kostyuk',
        },
        { property: 'og:locale', name: 'og:locale', content: 'en' },
        { property: 'og:type', name: 'og:type', content: 'website' },
      ],
      link: [
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

  runtimeConfig: {
    public: {
      base: isDevelopment
        ? 'http://localhost:3000'
        : 'https://bogdankostyuk.xyz',
    },
  },

  routeRules: {
    '/sitemap.xml': { prerender: true },
  },

  sourcemap: isDevelopment,

  css: [
    'normalize.css/normalize.css',
    'locomotive-scroll/dist/locomotive-scroll.css',
    '~/assets/styles/fonts.css',
    '~/assets/styles/global.css',
  ],

  build: {
    transpile: ['gsap', 'std-env'],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      concurrency: 4,
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/fontaine',
    '@logotip4ik_/nuxt-cloudflare-headers',
  ],

  fontMetrics: {
    fonts: [{ family: 'e-Ukraine', src: '/fonts/e-Ukraine-Thin.woff2' }],
  },

  vite: {
    plugins: [GLSL({ compress: !isDevelopment }), SVGLoader({ svgo: false })],
  },

  cloudflareHeaders: {
    '/*': [
      { 'X-Robots-Tag': 'all' },
      { 'X-Frame-Options': 'DENY' },
      { 'X-Content-Type-Options': 'nosniff' },
      { 'Referrer-Policy': 'no-referrer' },
      { 'Permissions-Policy': 'document-domain=()' },
      // no cache by default
      { 'Cache-Control': 'private, must-revalidate, max-age=0' },
    ],
    // but long cache for assets with build hash
    // week cache and 6 months stale while revalidate
    '/_nuxt/*': {
      'Cache-Control':
        'public, immutable, max-age=604800, stale-while-revalidate=16070400',
    },
  },
});
