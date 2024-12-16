Function.prototype.myApply = function (thisContext, args) {
  // Ensure the function calling `myApply` is actually a function
  if (typeof this !== "function") {
    throw new TypeError(this + "Callback must be a function");
  }

  // Default `thisContext` to the global object if null or undefined
  thisContext = thisContext || globalThis;

  // Temporarily attach the current function (`this`) to the context object
  thisContext.tempFn = this;

  // Use the spread operator to pass the `args` array to the function
  const result = thisContext.tempFn(...args);

  // Remove the temporary property to avoid modifying the object permanently
  delete thisContext.tempFn;

  // Return the result of the function invocation
  return result;
};
