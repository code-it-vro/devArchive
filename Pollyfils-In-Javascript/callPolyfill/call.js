Function.prototype.myCall = function (thisContext, ...args) {
  // Default `thisContext` to the global object if it's null or undefined
  thisContext = thisContext || globalThis;

  // Validate that the provided callback is a function
  if(typeof this !== "function") {
    throw new TypeError(this + "Callback must be a function");
  }

  // Create a temporary property to store the function
  thisContext.tempFn = this;

  // Call the function using the temporary property with provided arguments
  const result = thisContext.tempFn(...args);

  // Delete the temporary property to clean up
  delete thisContext.tempFn;

  // Return the result of the function call
  return result;
};



// // Example usage:
// function greet(greeting) {
//   return `${greeting}, my name is ${this.name}`;
// }

// const person = { name: "Alice" };
// console.log(greet.myCall(person, "Hello")); // Output: "Hello, my name is Alice"
