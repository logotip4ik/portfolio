export default defineNuxtPlugin(() => {
  const checkReducedMotion = () =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return { provide: { checkReducedMotion } };
});
