/**
 * @param {boolean} [defaultValue=true] what will be returned on server side
 * @returns {import('vue').Ref<boolean>}
 * */
export function useDarkMode(defaultValue = true) {
  if (typeof window === 'undefined')
    return ref(defaultValue);

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
}
