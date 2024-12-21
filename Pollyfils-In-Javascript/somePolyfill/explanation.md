## `some()` method in JS

#### The `some()` method tests whether at least one element in the array passes the test implemented by the provided function. It returns a `boolean` value.

### Syntax
`array.some(callback(element[, index[, array]])[, thisArg])`

### Parameters

- **callback**: Function to test for each element, which takes three arguments:

**element**: The current element being processed
&nbsp;

**index**: The index of the current element
&nbsp;

**array**: The array some() was called upon


- thisArg: Optional. Value to use as this when executing callback


## `mySome()` Polyfill Explanation

- **Function Definition:**

Added to Array.prototype to make it available for all arrays
Takes two parameters: callback and thisContext

- **Input Validation:**

Checks if callback is a function
Throws error if invalid type is provided
Ensures method safety and reliability

- **Array Reference:**

Stores this in array variable
Makes code more readable and maintainable
Provides consistent reference throughout the function

- **Iteration Process:**

Uses standard for loop to traverse array
Checks each element sequentially
Allows for early termination when match is found

- **Sparse Array Handling:**

Uses `hasOwnProperty` check
Skips holes in sparse arrays
Maintains consistent behavior with native implementation

- **Callback Execution:**

Uses `call()` to set proper this context
Passes three arguments:

Current element (array[i])
Current index (i)
Original array (array)

- **Return Logic:**

Returns true immediately if callback returns truthy value
Returns false if no elements pass the test
Matches native `some()` behavior



