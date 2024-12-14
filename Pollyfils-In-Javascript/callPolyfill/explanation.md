# What is `Call` keyword

The `call` keyword in JavaScript is a method that allows you to invoke a function with a specified `this` value and pass arguments individually. It is often used when you want to explicitly set the `this` context of a function or reuse a method across different objects.
It can be used to invoke (call) a method with an owner object as an argument (parameter).

&nbsp;

## Why and when to use `call`?

- **Setting the context (`this`)**: When calling a method of one object in the context of another object.
- **Borrowing methods**: Reusing functions or methods defined for one object in the context of another.
- **Invoking functions dynamically**: When the `this` context needs to be set dynamically at runtime.
- Example: Borrowing array methods for array-like objects (like `arguments`).

&nbsp;


## Code Explanation

1. **Defaulting `thisContext`:**
If the provided `thisContext` is `null` or `undefined`, it defaults to the global object (`globalThis` ensures compatibility with environments like Node.js and browsers).

2. **Validating the function:**
The provided function (`this`) is validated to ensure it's a function. If it's not, an error is thrown to mimic the behavior of the native `call` method.

3. **Attaching the function:**
The function being called (`this`) is temporarily assigned to the `thisContext` object under the unique key.

4. **Executing the function:**
The function is invoked with the provided arguments using the spread operator.

5. **Cleaning up:**
After execution, the temporary property is deleted from the `thisContext` to avoid modifying the object permanently.

This polyfill emulates the behavior of the native `call` method while ensuring the `this` value is explicitly set during the function invocation.