export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'portfolio-v4',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    '~assets/css/global.css',
    '~/assets/css/utils.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://vite.nuxtjs.org
    // 'nuxt-vite',
    // https://github.com/ivodolenc/nuxt-gsap-module
    'nuxt-gsap-module',
    // https://google-fonts.nuxtjs.org
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        // NOTE: this is an issue with postcss-values-parser
        // here is an issue: https://github.com/shellscape/postcss-values-parser/issues/136
        'postcss-custom-properties': false,
        'postcss-values-parser': false,
        'postcss-preset-env': false,
      },
    },
    extend(config) {
      // This enables to import .glsl, .frag, .vert, as modules
      // example: import vertexShader from '~/assets/shaders/vertex.glsl'
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      })
    },
  },

  // https://github.com/ivodolenc/nuxt-gsap-module#multiple-plugins
  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true,
    },
  },

  googleFonts: {
    families: {
      'Nunito+Sans': {
        wght: [400],
      },
    },
    display: 'swap',
    download: true,
  },
}
