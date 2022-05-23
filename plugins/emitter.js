import mitt from 'mitt';

const emitter = mitt();

export default defineNuxtPlugin(() => {
  return { provide: { emitter } };
});
