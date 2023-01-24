import GLSL from 'vite-plugin-glsl';
import SVGLoader from 'vite-svg-loader';

const isDev = process.env.NODE_ENV === 'development';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  routeRules: {
    '/sitemap.xml': { prerender: true },
  },

  sourcemap: false,

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

  vite: {
    plugins: [GLSL({ compress: !isDev }), SVGLoader({ svgo: false })],
  },

  cloudflareHeaders: {
    '/*': [
      { 'X-Robots-Tag': 'all' },
      { 'X-Frame-Options': 'DENY' },
      { 'X-Content-Type-Options': 'nosniff' },
      { 'Referrer-Policy': 'no-referrer' },
      { 'Permissions-Policy': 'document-domain=()' },

      // 1week cache and 6 month stale while revalidate
      { 'Cache-Control': 'public, immutable, max-age=604800, style-while-revalidate=16070400' },
    ],
    '/': [{ 'Cache-Control': 'no-store' }],
    '/project/*': [{ 'Cache-Control': 'no-store' }],
  },
});
