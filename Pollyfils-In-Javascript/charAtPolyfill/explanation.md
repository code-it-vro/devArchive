# Polyfill for `String.prototype.charAt`

This polyfill implements the behavior of the native `String.prototype.charAt` method. It retrieves the character at a specific index from a string. If the index is out of bounds, it returns an empty string (`""`).

### `const copyStr = this;`
this stores current string as its copy 

### check for valid index
now we check wheather the user is giving correct index or not and it lies in the range of string length if not then we return `empty string` else we will return the character at that index

### `return copyStr.charAt(index);`