Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("promises must be an array"));
    }
    const n = promises.length;
    const results = [];
    if (n === 0) {
      return resolve(results);
    }
    promises.forEach(async (promise, index) => {
      try {
        const res = await promise;
        results[index] = res;
        if ((index === n - 1)) {
          resolve(results);
          return;
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};
