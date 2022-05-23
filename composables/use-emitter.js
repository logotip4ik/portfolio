export default () => {
  const nuxtApp = useNuxtApp();

  return nuxtApp.$emitter;
};
