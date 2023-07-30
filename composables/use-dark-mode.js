/** @returns {import('vue').Ref<boolean>} */
export default (defaultValue = true) => {
  if (typeof window === 'undefined') return ref(defaultValue);

  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const isDarkMode = ref(media.matches);

  const unregister = on(
    media,
    'change',
    (media) => (isDarkMode.value = media.matches),
    true
  );

  onBeforeUnmount(() => {
    unregister();
  });

  return isDarkMode;
};
