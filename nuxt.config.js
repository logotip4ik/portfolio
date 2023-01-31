import { isDevelopment } from 'std-env';
import GLSL from 'vite-plugin-glsl';
import SVGLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  routeRules: {
    '/sitemap.xml': { prerender: true },
  },

  sourcemap: isDevelopment,

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
    plugins: [GLSL({ compress: !isDevelopment }), SVGLoader({ svgo: false })],
  },

  cloudflareHeaders: {
    '/*': [
      { 'X-Robots-Tag': 'all' },
      { 'X-Frame-Options': 'DENY' },
      { 'X-Content-Type-Options': 'nosniff' },
      { 'Referrer-Policy': 'no-referrer' },
      { 'Permissions-Policy': 'document-domain=()' },

      // 2 days cache and 6 months stale while revalidate
      { 'Cache-Control': 'public, immutable, max-age=172800, style-while-revalidate=16070400' },
    ],
    '/': [{ 'Cache-Control': 'no-store' }],
    '/project/*': [{ 'Cache-Control': 'no-store' }],
  },
});
