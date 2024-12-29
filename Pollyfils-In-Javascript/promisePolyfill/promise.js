/**
 * Custom Promise implementation following the Promises/A+ specification
 * @param {Function} executor Function that receives resolve and reject functions
 */
function MyPromise(executor) {
  // Track the promise state: 'pending', 'fulfilled', or 'rejected'
  let state = "pending";

  // Store the value (result for resolve, error for reject)
  let value;

  // Queue of handlers (onFulfilled/onRejected callbacks)
  const handlers = [];

  /**
   * Resolves the promise with a value
   * @param {*} result The value to resolve with
   */
  function resolve(result) {
    // Promise can only transition from pending once
    if (state !== "pending") return;

    state = "fulfilled";
    value = result;
    // Process any queued handlers
    handlers.forEach(handle);
  }
  /**
   * Rejects the promise with an error
   * @param {*} error The error to reject with
   */
  function reject(error) {
    // Promise can only transition from pending once
    if (state !== "pending") return;

    state = "rejected";
    value = error;
    // Process any queued handlers
    handlers.forEach(handle);
  }
  /**
   * Handles resolution/rejection with appropriate callbacks
   * @param {Object} handler Contains onFulfilled/onRejected callbacks
   */
  function handle(handler) {
    if (state === "fulfilled" && handler.onFulfilled) {
      // Execute success callback with stored value
      handler.onFulfilled(value);
    } else if (state === "rejected" && handler.onRejected) {
      // Execute error callback with stored error
      handler.onRejected(value);
    } else if (state === "pending") {
      // Queue handler if promise still pending
      handlers.push(handler);
    }
  }
  /**
   * Chains promises and transforms values
   * @param {Function} onFulfilled Success callback
   * @returns {MyPromise} New promise
   */
  this.then = function (onFulfilled) {
    return new MyPromise((resolve, reject) => {
      handle({
        onFulfilled: (result) => {
          try {
            // Transform value through callback
            resolve(onFulfilled(result));
          } catch (err) {
            // Catch and reject any errors
            reject(err);
          }
        },
        onRejected: reject,
      });
    });
  };

  /**
   * Handles rejected promises
   * @param {Function} onRejected Error callback
   * @returns {MyPromise} New promise
   */
  this.catch = function (onRejected) {
    return this.then(null, onRejected);
  };

  // Execute the promise executor function
  try {
    executor(resolve, reject);
  } catch (error) {
    // Catch any synchronous errors
    reject(error);
  }
}
