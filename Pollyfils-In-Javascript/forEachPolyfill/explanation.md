# What is `forEach` method in Js and how to write its polyfill

&nbsp;


The `forEach()` method calls a function for each element in an array.The `forEach()` method is not executed for empty elements.

**Syntax of forEach**  —>   `array.forEach(function(currentValue, index, arr), thisValue*)`
| *function()* | Required.A function to run for each array element. |
| --- | --- |
| *currentValue* | Required.The value of the current element. |
| *index* | Optional.The index of the current element. |
| *arr* | Optional.The array of the current element. |
| *thisValue* | Optional. Default `undefined`.A value passed to the function as its `this` value. |

&nbsp;

&nbsp;


## Why First approach is better 

1. **Validate Input:** -- Ensure the `parameters` argument is a valid function before invoking it. If not, throw an appropriate error to mimic the behavior of the native `forEach`.
   
2. **Handle Empty or Sparse Arrays:** -- The native `forEach` skips over empty slots in arrays. To emulate this, you can check if `this[i]` exists using `Object.prototype.hasOwnProperty`.
   
3. **Support Context (Optional):** -- Allow a `thisArg` parameter to set the `this` context for the callback, similar to how native `forEach` works when you pass a second argument.
   
4. **Use `Strict Mode`:** --  Add `"use strict";` to prevent unexpected errors like unintended global variable declarations.

&nbsp;


 
### **Why Do We Need `thisContext`?**

By default, in JavaScript, the value of `this` inside a function depends on how the function is called:

- For regular functions, `this` may default to `undefined` in strict mode or the global object in non-strict mode.
- In a callback, `this` might not point to the desired context, especially when the callback is invoked by an array method like `forEach`.

Passing a `thisContext` ensures that `this` inside the callback refers to the desired object or value, avoiding unpredictable behavior.

&nbsp;

### Why Not Use `callback(thisContext, this[i], i, this)`?

```jsx
callback(thisContext, this[i], i, this);
```

You are **calling the function** `callback` with `thisContext` as the **first argument**, followed by `this[i]`, `i`, and `this`. This does not set the `this` value for the `callback` function. In JavaScript, the `this` value inside a function is determined by **how the function is called**, not by the arguments passed to it. To explicitly set the `this` value for a function, you need to use `.call()`, `.apply()`, or `.bind()`.

---

### What Does `call()` Do?

The `.call()` method allows you to:

1. **Set the value of `this`** inside the function.
2. Pass additional arguments to the function.

&nbsp;

### Step-by-Step Breakdown of `callback.call(thisContext, this[i], i, this)`:

1. **Set the Context:**
    - The first argument, `thisContext`, becomes the value of `this` inside `callback`.
2. **Pass the Arguments:**
    - `this[i]` is passed as the first argument of the `callback`.
    - `i` (index) is passed as the second argument.
    - `this` (the original array) is passed as the third argument.
3. **Execute the Callback:**
    - The `callback` function is executed with the correct `this` value and arguments.