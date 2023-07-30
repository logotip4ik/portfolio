/** @returns {import('vue').Ref<boolean>} */
export function useReducedMotion() {
  if (typeof window === 'undefined') return ref(false);

  const media = window.matchMedia('(prefers-reduced-motion: reduce)');

  const prefersReducedMotion = ref(media.matches);

  const unregister = on(
    media,
    'change',
    (media) => (prefersReducedMotion.value = media.matches),
    true
  );

  onBeforeUnmount(() => {
    unregister();
  });

  return prefersReducedMotion;
}
