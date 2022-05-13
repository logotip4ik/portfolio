import { defineNuxtConfig } from 'nuxt';

import PluginGLSL from 'vite-plugin-glsl';
import PluginSVGLoader from 'vite-svg-loader';
import PluginEslint from 'vite-plugin-eslint';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,

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
