Function.prototype.myBind = function (thisContext, args) {
  // Ensure that 'this' is a function. If not, throw a TypeError
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }

  // Store the original function in 'tempFunc' on the context object
  thisContext.tempFunc = this;

  // Return a new function that will invoke the original function with the proper 'this' context
  return function (...otherArgs) {
    // Use 'call' to ensure the correct 'this' context is used when invoking the original function
    return thisContext.tempFunc(...args, ...otherArgs);
  };
};
