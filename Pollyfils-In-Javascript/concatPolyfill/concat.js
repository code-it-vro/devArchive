/**
 * Custom implementation of Array.prototype.concat
 * Concatenates the array it is called on with the arguments passed to it.
 * Handles both arrays and non-array values.
 */
Array.prototype.myConcat = function () {
  // Copy the current array (on which myConcat is called) into a new array
  let arr = [...this];

  // Capture all arguments passed to myConcat
  let restArguments = arguments;

  // Iterate over each argument
  for (let i = 0; i < restArguments.length; i++) {
    // Check if the argument is an array
    if (Array.isArray(restArguments[i])) {
      // Spread the array elements into the result array
      arr = [...arr, ...restArguments[i]];
    } else {
      // If not an array, push the value directly into the result array
      arr.push(restArguments[i]);
    }
  }

  // Return the concatenated array
  return arr;
};

// Example usage
let arr1 = [1, 2, 3, 4];
let arr2 = [5, 6, 7, 8];
let arr3 = arr1.myConcat(arr2); // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arr3);
