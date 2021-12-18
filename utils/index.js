/**
 * @description Dependents on body `data-initial-loaded`. If it is set to true, it will return low initial delay, elsewhere it will return long delay
 * @returns {Number} Seconds as initial delay
 */
export function getInitialDelay() {
  return document.body.dataset.initialLoaded ? 0.15 : 1.125
}
