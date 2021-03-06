/**
 * throttle function that catches and triggers last invocation
 * use time to see if there is a last invocation
 *
 * https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
 * https://codepen.io/b00stup/pen/zYKOOqw?editors=0010
 */
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
