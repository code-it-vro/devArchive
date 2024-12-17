## What is `filter()`
The `filter()` method creates a new array with all elements that pass the test implemented by the provided callback function.

### Syntax

`let newArray = array.filter(callback(element[, index[, array]])[, thisArg])`


## `myFilter()` Polyfill Explanation

- Function Validation:
Checks if the provided callback is a function
Throws a TypeError if not a function
Mimics the native filter() method's error handling


- New Array Initialization:
Creates an empty array to store filtered elements
Ensures no modification of the original array


- Array Iteration:
ses a for loop to manually iterate through array elements
Object.prototype.hasOwnProperty.call() ensures only existing indices are processed
Handles sparse arrays correctly


- Callback Execution:
Uses call() to invoke the callback with specified context
Passes current element, index, and original array as arguments
Callback must return a boolean value


- Conditional Element Selection:
Checks the boolean result of the callback
Adds the current element to newArray only if callback returns true


- Result Return:
Returns the new array containing only elements that passed the filter condition