/** @returns {import('vue').Ref<boolean>} */
export default (defaultValue = true) => {
  if (typeof window === 'undefined') return ref(defaultValue);

  const media = window.matchMedia('(prefers-color-scheme: dark)')

  const isDarkMode = ref(media.matches);

  const onMediaChange = (media) => isDarkMode.value = media.matches;

  media.addEventListener('change', onMediaChange, true);

  onBeforeUnmount(() => {
    media.removeEventListener('change', onMediaChange);
  })

  return isDarkMode
}