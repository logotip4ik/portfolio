import mitt from 'mitt';

const emitter = mitt();

export function useEmitter() {
  return {
    ...emitter,

    once: (eventName, cb) => {
      const handler = () => {
        if (typeof cb === 'function') cb();

        emitter.off(eventName, handler);
      };

      emitter.on(eventName, handler);
    },
  }
}
