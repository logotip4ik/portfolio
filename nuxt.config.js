import { defineNuxtConfig } from 'nuxt';

import PluginGLSL from 'vite-plugin-glsl';
import PluginSVGLoader from 'vite-svg-loader';
import PluginEslint from 'vite-plugin-eslint';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  target: 'static',

  head: {
    htmlAttrs: { lang: 'en', dir: 'ltr' },
    meta: [
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
      { name: 'theme-color', content: 'var(--black-color)' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'copyrighted-site-verification', content: 'c552f044f4e41c2b' },
    ],
    link: [
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
  },

  css: [
    'normalize.css/normalize.css',
    'locomotive-scroll/dist/locomotive-scroll.css',
    '~/assets/fonts/styles.css',
    '~/assets/styles/global.css',
  ],

  vite: {
    plugins: [PluginGLSL(), PluginSVGLoader({ svgo: false }), PluginEslint()],
  },
});
