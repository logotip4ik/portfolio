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
    name: 'Books Store',
    img: require('./assets/BookStoreLogo-min.png'),
    desc:
      'Read, Create or Star any book that you want. This is my first time using Apollo-Server with Next.js',
    techUsed: [
      { id: Math.random() * 100, content: 'Javascript/Typescript' },
      { id: Math.random() * 100, content: 'NodeJS/TS-Node' },
      { id: Math.random() * 100, content: 'Next.js' },
      { id: Math.random() * 100, content: 'Apollo-Server' },
      { id: Math.random() * 100, content: 'Prisma.js' },
      { id: Math.random() * 100, content: 'GraphQL' },
    ],
    source: 'https://github.com/logotip4ik/books-store',
    live: 'https://books-store.vercel.app',
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
