Array.prototype.myMap = function (thisContext, Callback) {
  // Validate callback is a function
  if (typeof Callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  // Create a new array to store results
  const newArray = [];

  // Iterate through the original array
  for (let i = 0; i < this.length; i++) {
    // Check if the index exists in the array
    if (Object.prototype.hasOwnProperty.call(this, i)) {
      // Call the callback with:
      // - thisContext as the 'this' value
      // - current element
      // - current index
      // - original array
      const result = Callback.call(thisContext, this[i], i, this);

      // Add the result to the new array
      newArray.push(result);
    }
  }

  // Return the new transformed array
  return newArray;
};
