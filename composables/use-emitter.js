export default () => {
  const nuxtApp = useNuxtApp();

  return {
    ...nuxtApp.$emitter,
    once: (eventName, cb) => {
      const handler = () => {
        if (typeof cb === 'function') cb();

        nuxtApp.$emitter.off(eventName, handler);
      };

      nuxtApp.$emitter.on(eventName, handler);
    },
  };
};
