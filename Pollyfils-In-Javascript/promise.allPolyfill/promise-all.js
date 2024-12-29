Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("promises must be an array"));
    }

    const n = promises.length;
    const results = [];
    let completedCount = 0;

    if (n === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          results[index] = res; // Preserve order
          completedCount++;

          if (completedCount === n) {
            resolve(results); // Resolve only when all promises are fulfilled
          }
        })
        .catch((error) => {
          reject(error); // Reject immediately if any promise fails
        });
    });
  });
};
