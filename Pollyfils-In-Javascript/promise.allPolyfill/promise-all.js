Promise.myAll = function (promises) {
  // Return a new Promise that will handle the collection of promises
  return new Promise((resolve, reject) => {
    // Input validation: Check if the argument is an array
    if (!Array.isArray(promises)) {
      return reject(new TypeError("promises must be an array"));
    }

    const n = promises.length;
    // Array to store results in the same order as input promises
    const results = [];
    // Counter to track completed promises
    let completedCount = 0;

    // Edge case: if empty array, resolve immediately with empty results
    if (n === 0) {
      return resolve(results);
    }

    // Iterate through each promise in the input array
    promises.forEach((promise, index) => {
      // Convert non-promise values to promises using Promise.resolve
      Promise.resolve(promise)
        .then((res) => {
          // Store result at the same index to maintain order
          results[index] = res;
          completedCount++;

          // If all promises are completed, resolve with results array
          if (completedCount === n) {
            resolve(results);
          }
        })
        .catch((error) => {
          // If any promise rejects, immediately reject the entire Promise.all
          reject(error);
        });
    });
  });
};
