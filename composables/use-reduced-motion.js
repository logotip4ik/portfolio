/** @returns {import('vue').Ref<boolean>} */
export default () => {
  if (typeof window === 'undefined') return ref(false);

  const media = window.matchMedia('(prefers-reduced-motion: reduce)');

  const prefersReducedMotion = ref(media.matches);

  const onMediaChange = (media) => (prefersReducedMotion.value = media.matches);

  media.addEventListener('change', onMediaChange, true);

  onBeforeUnmount(() => {
    media.removeEventListener('change', onMediaChange);
  });

  return prefersReducedMotion;
};
