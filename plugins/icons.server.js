import path from 'path';

import useIcons from '~/composables/use-icons';

const rawIcons = import.meta.glob('../assets/img/*.svg', {
  as: 'raw',
});

/* So, this works by importing svgs as strings and setting it to
the useIcons object, which under the hood uses nuxt hook useState.
This allows to pass data from server to client. We are importing
svg's on the server and then client can use it vie its key(filename without extension) */

/* NOTE: only svgs ending with .icon.svg will be imported
and only them could be used in useIcons composable */

export default defineNuxtPlugin(async () => {
  // NOTE: none of icons is used on client side,
  // so this will make bundle size a bit smaller
  return;

  const icons = useIcons();

  const iconNames = [];
  const iconPromises = [];

  for (const key of Object.keys(rawIcons)) {
    const filename = path.parse(key).name;
    const splittedFilename = filename.split('.');

    if (splittedFilename.length < 2 || splittedFilename.at(-1) !== 'icon')
      continue;

    const iconName = splittedFilename.at(0);
    const iconValue = rawIcons[key]?.();

    iconNames.push(iconName);
    iconPromises.push(iconValue);
  }

  const iconValues = await Promise.all(iconPromises);

  for (const idx in iconValues) icons.value[iconNames[idx]] = iconValues[idx];
});
