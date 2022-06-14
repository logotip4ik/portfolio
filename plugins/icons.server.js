import path from 'path';

import useIcons from '~/composables/use-icons';

const rawIcons = import.meta.glob('../assets/img/*.svg', { as: 'raw' });

/* So, this works by importing svgs as strings and setting it to
the useIcons object, which under the hood uses nuxt hook useState.
This allows to pass data from server to client. We are importing
svg's on the server and then client can use it vie its key(filename without extension) */
export default defineNuxtPlugin(() => {
  const icons = useIcons();

  for (const key of Object.keys(rawIcons)) {
    const name = path.parse(key).name;

    icons.value[name] = rawIcons[key];
  }
});
