
/**
 * @param {import('vue').Ref<HTMLElement | null>} refEl
 * @param { () => any } callback
 */
export default (refEl, callback) => {
  const stop = watch(() => unref(refEl), (el) => {
    if (!el) return;

    stop();

    waitForImages(el).then(callback)
  }, { immediate: true })
}

/**
 * @param {HTMLElement} wrapper 
 * @return {Promise<void>} 
 */
function waitForImages(wrapper) {
  const images = wrapper.querySelectorAll('img')

  return new Promise((resolve) => {
    let numberOfLoadedImages = 0;

    const loadListener = () => {
      if (images.length == ++numberOfLoadedImages) {
        resolve()
      }
    }
    
    images.forEach(image => {
      if (image.complete) { loadListener() }
      image.addEventListener('load', loadListener)
    })
  })
}