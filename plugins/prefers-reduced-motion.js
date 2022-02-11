export default (_, inject) => {
  const checkReducedMotion = () =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches

  inject('prefersReducedMotion', checkReducedMotion)
}
