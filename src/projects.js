/* eslint-disable global-require */
export default [
  {
    name: 'Easy Bank',
    img: require('./assets/EasyBankLogo-min.png'),
    desc: 'Challenge from frontend mentor. I tried to make it as simple as possible',
    techUsed: [
      { id: Math.random() * 100, content: 'HTML' },
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'Scss' },
      { id: Math.random() * 100, content: 'Parcel' },
    ],
    source: 'https://github.com/logotip4ik/frontend-mentor-easybank',
    live: 'https://logotip4ik.github.io/frontend-mentor-easybank/',
  },
  {
    name: 'My journal',
    img: require('./assets/MyJournalLogo-min.png'),
    desc: 'Simple Vue project with index db for logging my homework.',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'Vue' },
      { id: Math.random() * 100, content: 'Vuetify' },
      { id: Math.random() * 100, content: 'IndexDB' },
    ],
    source: 'https://github.com/logotip4ik/My-journal',
    live: 'https://logotip4ik.github.io/my-journal/',
  },
  {
    name: 'Nuxt Store',
    img: require('./assets/Nuxt-Store-Logo-min.png'),
    desc:
      'E-Commerce store build with Nuxt. Content is fetching from Netlify CMS. Inspired from JolyBell.com',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'Nuxt' },
      { id: Math.random() * 100, content: 'Scss' },
      { id: Math.random() * 100, content: 'Netlify CMS' },
    ],
    source: 'https://github.com/logotip4ik/nuxt-store',
    live: 'https://nuxt-store-cms.netlify.app/',
  },
  {
    name: 'Todo Web App',
    img: require('./assets/TodoWebAppLogo-min.png'),
    desc: 'Your todos in browser. Synced between all devices.',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'NodeJS' },
      { id: Math.random() * 100, content: 'Vue' },
      { id: Math.random() * 100, content: 'Vuetify' },
      { id: Math.random() * 100, content: 'Feathers.js' },
    ],
    source: 'https://github.com/logotip4ik/TodoWebApp',
    live: 'https://todo-web-app.vercel.app',
  },
  {
    name: 'HackerNews',
    img: require('./assets/HackerNews-min.jpg'),
    desc:
      'HackerNews clone, modernized version of original HackerNews website, also have dark mode',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'Nuxt' },
      { id: Math.random() * 100, content: 'Scss' },
      { id: Math.random() * 100, content: 'HackerNews API' },
    ],
    source: 'https://github.com/logotip4ik/nuxt-hackernews',
    live: 'https://nuxt-hackernews.vercel.app',
  },
  {
    name: 'Countries',
    img: require('./assets/LogoCountries-min.jpg'),
    desc: 'Search, filter and see detailed info about each country in the World.',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript' },
      { id: Math.random() * 100, content: 'Nuxt' },
      { id: Math.random() * 100, content: 'Scss' },
      { id: Math.random() * 100, content: 'Frontend Mentor' },
      { id: Math.random() * 100, content: 'REST Countries API' },
    ],
    source: 'https://github.com/logotip4ik/countries',
    live: 'https://countries.bogdankostyuk.vercel.app/',
  },
];
