Array.prototype.myFind = function (callback, thisContext) {
  // Validate the callback function
  // Ensures that a valid function is passed as the first argument
  // Throws an error if the callback is not a function, mimicking native behavior
  if (typeof callback !== "function") {
    throw new Error("Callback must be a function");
  }
  // Create a reference to the current array
  // Helps maintain clarity and provides a consistent reference throughout the method
  const temp = this;

  // Iterate through each element in the array
  // Uses standard `for` loop to manually traverse array elements
  for (let i = 0; i < temp.length; i++) {
    // Check if the current index is a valid, existing property of the array
    // Prevents processing of undefined or deleted elements in sparse arrays
    // Uses `hasOwnProperty` to ensure only defined indices are checked
    if (Object.prototype.hasOwnProperty.call(temp, i)) {
      // Execute the callback function for the current element
      // Passes three arguments:
      // 1. Current element
      // 2. Current index
      // 3. Original array
      // Uses `call()` to explicitly set the `this` context if provided
      const result = callback.call(thisContext, temp[i], i, temp);

      // If the callback returns `true`, immediately return the current element
      // This matches the native `find()` method's behavior of returning the first matching element
      if (result) {
        return temp[i];
      }
    }
  }

  // If no element passes the test, return `undefined`
  // Consistent with native `find()` method's default return value
  return undefined;
};

// Usage Example
const arr = [1, 2, 3, 4, 5];
const firstGreaterThanThree = arr.myFind((num) => num > 3);
console.log(firstGreaterThanThree); // 4
