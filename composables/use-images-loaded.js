/**
 * @param {import('vue').Ref<HTMLElement | null>} refEl
 * @param { () => any } callback
 */
export default (refEl, callback) => {
  const stop = watch(
    () => unref(refEl),
    (el) => {
      if (!el) return;

      stop();

      waitForImages(el).then(callback);
    },
    { immediate: true }
  );
};

/**
 * @param {HTMLElement} wrapper
 * @return {Promise<void>}
 */
function waitForImages(wrapper) {
  const images = wrapper.querySelectorAll('img');

  return new Promise((resolve) => {
    let numberOfLoadedImages = 0;

    const loadListener = (image) => {
      if (images.length == ++numberOfLoadedImages) {
        resolve();

        image.removeEventListener('load', loadListener, true);
      }
    };

    images.forEach((image) => {
      // In my case lazy images could be just ignored, but if needed you can create
      // `new Image` with appropriate src and wait for load event on this image
      if (image.complete || image.getAttribute('loading') === 'lazy')
        loadListener(image);
      else image.addEventListener('load', loadListener, true);
    });
  });
}
