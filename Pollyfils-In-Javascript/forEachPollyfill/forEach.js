// Ideal approach (Approach 1)


Array.prototype.myForEach = function (callback, thisContext) {
  // Validate that the provided callback is a function
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  // Iterate over the array elements
  for (let i = 0; i < this.length; i++) {
    // Process only the defined properties (skip empty slots)
    if (Object.prototype.hasOwnProperty.call(this, i)) {
      callback.call(thisContext, this[i], i, this);
    }
  }
};

// Easy way or less secure way below (Approach 2)

/*
Array.prototype.myForEach = function (parameters) {
  let size = this.length;
  for (let i = 0; i < size; i++) {
    parameters(this[i], i, this);
  }
};

*/
