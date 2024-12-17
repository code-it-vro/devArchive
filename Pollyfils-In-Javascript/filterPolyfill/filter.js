Array.prototype.myFilter = function (thisContext, callback) {
  // Validate that the callback is actually a function
  // Throws a TypeError if not, mimicking native filter behavior
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }
  // Create a new array to store filtered elements
  let newArray = [];

  // Iterate through each element of the array
  for (let i = 0; i < this.length; i++) {
    // Check if the current index actually exists in the array
    // This handles sparse arrays and ensures only defined elements are processed
    if (Object.prototype.hasOwnProperty.call(this, i)) {
      // Call the callback function with:
      // - thisContext as the 'this' value
      // - current element
      // - current index
      // - original array
      // The result will be a boolean determining if the element should be kept
      const result = callback.call(thisContext, this[i], i, this);

      // If the callback returns true, add the current element to the new array
      if (result) {
        newArray.push(this[i]);
      }
    }
  }

  // Return the new array containing only the filtered elements
  return newArray;
};
