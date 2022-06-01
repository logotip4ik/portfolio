export default () => {
  const nuxtApp = useNuxtApp();

  return useState(
    'current-route',
    () => nuxtApp.$router.currentRoute.value.name
  );
};
