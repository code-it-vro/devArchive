## What is `map` keyword 

`map()` creates a new array from calling a function for every array element.
`map()` does not execute the function for empty elements.
`map()` does not change the original array.


### Syntax
`array.map(function(currentValue, index, arr), thisValue)`

### Explanation of polyfill

- **Function Validation**: The provided `callback` is validated to ensure it's a function. If not, a TypeError is thrown to mimic the native `map` behavior.
- **New Array Creation**: A new array `(newArray)` is initialized to store the transformed elements.
- **Iterating Through the Array**: A `for` loop iterates over the array. The `Object.prototype.hasOwnProperty.call()` method ensures the index exists in the array to avoid issues with sparse arrays.
- **Callback Execution**: The `callback` is invoked for each element, passing the current element, its index, and the original array as arguments. The `call()` method binds the optional `thisArg` value as the context for the `callback`.
- **Storing Results**: The result of each `callback` invocation is pushed into the new array.
- **Return the Transformed Array**: The new array containing transformed elements is returned as the result.