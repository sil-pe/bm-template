export function onResize(callback: () => void) {
  window.addEventListener('resize', callback);
}

/**
 * returns the pixels available horizontally for our components to render
 * @see http://ryanve.com/lab/dimensions/
 * @returns {number}
 */
export function getAvailableWidth() {
  return window.innerWidth;
}

/**
 * returns the pixels available vertically for our components to render
 * @see http://ryanve.com/lab/dimensions/
 * @returns {number}
 */
export function getAvailableHeight() {
  return window.innerHeight;
}
/**
 * returns if device is the touch capable also
 * @see https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/
 * @returns {boolean}
 */
export function isTouchDevice() {
  return (('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.mxMaxTouchPoints > 0)
    || (navigator.maxTouchPoints > 0));
}

