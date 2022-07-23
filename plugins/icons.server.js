import path from 'path';

import useIcons from '~/composables/use-icons';

// NOTE: only svgs ending with .icon.svg will be imported and
// only them could be used in useIcons composable
const rawIcons = import.meta.glob('../assets/img/*.icon.svg', {
  as: 'raw',
});

/* So, this works by importing svgs with `iconPrefix` as strings and setting it to
the useIcons object, which under the hood uses nuxt hook useState.
This allows to pass data from server to client. We are importing
svg's on the server and then client can use it vie its key(filename without extension) */
export default defineNuxtPlugin(() => {
  const icons = useIcons();

  for (const key of Object.keys(rawIcons)) {
    const [name] = path.parse(key).name.split('.');

    icons.value[name] = rawIcons[key];
  }
});
