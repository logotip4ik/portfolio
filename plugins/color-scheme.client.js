export default defineNuxtPlugin(() => {
  const colorScheme = window.matchMedia('(prefers-color-scheme: light)');

  const callbacks = [];
  let isDarkMode = !colorScheme.matches;

  colorScheme.addEventListener('change', (media) => {
    isDarkMode = !media.matches;
    callbacks.forEach((func) =>
      typeof func === 'function' ? func(media) : null
    );
  });

  return {
    provide: {
      isDarkMode: () => isDarkMode,
      onColorSchemeChange: (cb) => callbacks.push(cb),
    },
  };
});
