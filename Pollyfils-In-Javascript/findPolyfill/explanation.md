## `find()` method in javascript

The `find()` method returns the value of the first element that passes a test.
The `find()` method executes a function for each array element
The `find()` method returns undefined if no elements are found.
The `find()` method does not execute the function for empty elements.
The `find()` method does not change the original array.

### Syntax
`array.find(function(currentValue, index, arr),thisValue)`

## `myFind()` Polyfill explanation

- **Function Validation**
Checks if the provided callback is a function
Throws an error if not a function
Ensures type safety before execution


- **Manual Array Iteration**
Uses a `for` loop instead of built-in methods
Allows precise control over element processing


- **Conditional Element Return**
Returns the first element that passes the test
Stops iteration immediately after finding a match


- **Context Handling**
Supports optional `thisContext`
Uses call() to set the context of the callback function


- **Sparse Array Handling**
Uses `Object.prototype.hasOwnProperty.call()`
Ensures only existing array indices are processed