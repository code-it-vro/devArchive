Array.prototype.mySome = function (callback, thisContext) {
  // Type check: Validate that callback is a function
  // Throws an error if callback is not a function, matching native behavior
  if (typeof callback !== "function") {
    throw new Error("Callback must be a function");
  }

  // Store reference to current array
  // This improves readability and provides consistent reference
  const array = this;

  // Iterate through each element in array
  // Uses standard for loop to manually process each element
  for (let i = 0; i < array.length; i++) {
    // Check if current index exists in array
    // Handles sparse arrays by skipping empty/undefined slots
    // Uses hasOwnProperty to ensure only actual elements are processed
    if (Object.prototype.hasOwnProperty.call(array, i)) {
      // Call the test function with proper context and arguments:
      // - thisContext: value to use as 'this'
      // - array[i]: current element
      // - i: current index
      // - array: original array
      const result = callback.call(thisContext, array[i], i, array);

      // If callback returns truthy value for any element
      // Immediately return true and stop iteration
      // This matches behavior of native some() method
      if (result) {
        return true;
      }
    }
  }

  // If no element passes the test (callback never returns true)
  // Return false, matching native some() method's behavior
  return false;
};


// // Example usage:
// const numbers = [1, 2, 3, 4, 5];
// const hasEven = numbers.mySome((num) => num % 2 === 0); // true
// const hasNegative = numbers.mySome((num) => num < 0); // false
