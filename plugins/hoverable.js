import { pointerModifiersWhitelist } from '~/lib/constants';

export default defineNuxtPlugin({
  parallel: true,
  setup(nuxtApp) {
    const unregisterMap = new WeakMap();

    nuxtApp.vueApp.directive('hoverable', {
      mounted: (...args) => addEventListeners(...args),
      updated: (...args) => addEventListeners(...args),

      beforeUnmount(el) {
        unregisterMap[el].forEach((func) => func());

        unregisterMap[el] = [];
      },
    });

    function addEventListeners(el, { modifiers }) {
      const modifier = Object.keys(modifiers)[0] || 'link';

      if (!pointerModifiersWhitelist.includes(modifier))
        throw new Error(`not valid modifier: '${modifier}' at ${el}`);

      el.style.pointer = 'none';

      const emitter = useEmitter();

      unregisterMap[el] ||= [];

      unregisterMap[el].push(
        on(el, 'pointerenter', () => {
          emitter.emit(`pointer:${modifier}:active`);
        })
      );

      unregisterMap[el].push(
        on(el, 'pointerleave', () => {
          emitter.emit(`pointer:${modifier}:inactive`);
        })
      );
    }
  },
});
