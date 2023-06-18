import { on } from 'rad-event-listener';

// TODO: refactor this composable to accept media
/** @returns {import('vue').Ref<boolean>} */
export default () => {
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
};
