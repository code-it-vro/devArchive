String.prototype.myCharAt = function (index) {
  // Copy the current string (this refers to the string on which myCharAt is called)
  const copyStr = this;

  // Check if the index is out of bounds
  if (index < 0 || index >= copyStr.length) {
    return ""; // Return an empty string if the index is invalid
  }

  // Return the character at the given index
  return copyStr[index];
};

// Example usage
const str = "hello";
console.log(str.myCharAt(1)); // Output: "e"
console.log(str.myCharAt(10)); // Output: ""
console.log(str.myCharAt(-1)); // Output: ""
