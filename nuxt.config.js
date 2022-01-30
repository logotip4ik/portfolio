export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: { lang: 'en' },
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
      { name: 'theme-color', content: '#303030' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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

  // render: { csp: true },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    'locomotive-scroll/dist/locomotive-scroll.css',
    '~assets/css/global.css',
    '~assets/css/utils.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/smooth-scroll.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '~modules/cloudflare-headers.js',
    '~modules/update-humans-txt.js',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://google-fonts.nuxtjs.org
    '@nuxtjs/google-fonts',
    // https://vite.nuxtjs.org
    // 'nuxt-vite',
    // https://github.com/ivodolenc/nuxt-gsap-module
    'nuxt-gsap-module',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://image.nuxtjs.org
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://nuxt-seo.frostbutter.com/setup
    'nuxt-seo',
    // https://github.com/victor-perez/nuxt-helmet
    'nuxt-helmet',
    // https://content.nuxtjs.org/installation
    '@nuxt/content',
    // https://sitemap.nuxtjs.org
    '@nuxtjs/sitemap',
  ],

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
    extend(config, { isClient }) {
      // This enables to import .glsl, .frag, .vert, as modules
      // example: import vertexShader from '~/assets/shaders/vertex.glsl'
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      })

      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
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
        wght: [200, 400],
      },
    },
    display: 'swap',
    download: true,
    overwriting: true,
  },

  cloudflareHeaders: {
    '/*': [{ 'X-Robots-Tag': 'all' }],
  },

  sitemap: {
    defaults: { lastmod: new Date().toISOString() },
    hostname: 'https://bogdankostyuk.xyz',
    gzip: true,
    exclude: ['/admin/**'],
  },

  seo: {
    url: 'https://bogdankostyuk.xyz',
    baseUrl: 'https://bogdankostyuk.xyz',
    name: 'Bogdan Kostyuk',
    title: 'Front End Developer',
    templateTitle: '%name% | %title%',
    description:
      'I will build you website as quick as possible and with high attention to details 👌',
    author: false,
    lang: 'en',
    language: 'English',
    og: {
      type: 'website',
      image: {
        url: 'https://bogdankostyuk.xyz/logo.png',
        width: '1440',
        height: '1440',
      },
    },
    twitter: {
      site: '@BogdanKostyuk',
      creator: '@BogdanKostyuk',
      card: 'summary',
    },
  },
}
