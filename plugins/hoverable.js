import useEmitter from '~/composables/use-emitter';
import { pointerModifiersWhitelist } from '~/lib/constants';

export default defineNuxtPlugin((nuxtApp) => {
  const emitter = useEmitter();

  nuxtApp.vueApp.directive('hoverable', (el, { modifiers }) => {
    const modifier = Object.keys(modifiers)[0] || 'link';

    if (!pointerModifiersWhitelist.includes(modifier))
      throw new Error(`not valid modifier: '${modifier}' at ${el}`);

    el.style.pointer = 'none';

    el.addEventListener('pointerenter', () => {
      emitter.emit(`pointer:${modifier}:active`);
    });

    el.addEventListener('pointerleave', () => {
      emitter.emit(`pointer:${modifier}:inactive`);
    });
  });
});
