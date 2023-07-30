export default defineEventHandler((event) => {
  // NOTE: by default nitro will prerender this as html ¯\_(ツ)_/¯
  setHeader(event, 'Content-Type', 'text/plain');

  return `/*
\tX-Robots-Tag: all
\tX-Frame-Options: DENY
\tX-Content-Type-Options: nosniff
\tReferrer-Policy: no-referrer
\tPermissions-Policy: document-domain=()
\tCache-Control: private, must-revalidate, max-age=0

/_nuxt/*
\tCache-Control: public, immutable, max-age=604800, stale-while-revalidate=16070400`;
});
