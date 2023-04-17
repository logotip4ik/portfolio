export default ({
  title,
  description,
  link = [],
  meta = [],
  htmlAttrs = {},
  mode,
}) => {
  const base = 'https://bogdankostyuk.xyz';
  const projectSlug = useRoute().params.slug ?? '';
  const url = projectSlug ? `${base}/project/${projectSlug}` : base;

  useHead(
    {
      title,
      titleTemplate: '%s | Bogdan Kostyuk',
      htmlAttrs: { lang: 'en', dir: 'ltr' },
      meta: [
        { lang: 'en' },
        { language: 'English' },
        { property: 'name', name: 'name', content: 'Bogdan Kostyuk' },
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { 'http-equiv': 'Reply-to', content: 'contact@bogdankostyuk.xyz' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        description ? { name: 'description', content: description } : {},
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'all' },
        { name: 'theme-color', content: 'var(--surface-color)' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'copyrighted-site-verification', content: 'c552f044f4e41c2b' },
        { property: 'url', name: 'url', content: url },
        {
          property: 'og:site_name',
          name: 'og:site_name',
          content: 'Bogdan Kostyuk',
        },
        { property: 'og:title', name: 'og:title', content: title },
        description
          ? {
              property: 'og:description',
              name: 'og:description',
              content: description,
            }
          : {},
        { property: 'og:locale', name: 'og:locale', content: 'en' },
        { property: 'og:url', name: 'og:url', content: url },
        { property: 'og:type', name: 'og:type', content: 'website' },
        {
          property: 'og:image',
          name: 'og:image',
          content: projectSlug
            ? `${base}/img/${projectSlug}-logo.webp`
            : `${base}/logo.png`,
        },

        ...meta,
      ],
      link: [
        { rel: 'canonical', href: `${url}/` },
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

        ...link,
      ],
      htmlAttrs: { ...htmlAttrs },
    },
    { mode: mode ?? 'server' }
  );
};
