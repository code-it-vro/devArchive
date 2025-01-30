function myJSONStringify(value) {
  // Handle null values explicitly
  if (value === null) return "null";

  // Handle string values by enclosing them in double quotes
  if (typeof value === "string") return `"${value}"`;

  // Handle numbers and booleans by converting them directly to strings
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);

  // Handle arrays by recursively applying myJSONStringify to each element
  if (Array.isArray(value)) {
    // Map over each item and stringify it; replace undefined with "null"
    const serializedItems = value.map(
      (item) => myJSONStringify(item) || "null"
    );
    return `[${serializedItems.join(",")}]`; // Join elements with commas
  }

  // Handle objects (non-null and non-array objects)
  if (typeof value === "object") {
    // Convert object to an array of key-value pairs using Object.entries()
    const serializedEntries = Object.entries(value)
      .map(([key, val]) => {
        // Recursively stringify the value
        const serializedVal = myJSONStringify(val);
        // If the value is undefined, skip this key-value pair
        return serializedVal !== undefined
          ? `"${key}":${serializedVal}`
          : undefined;
      })
      .filter((entry) => entry !== undefined); // Remove any undefined values
    return `{${serializedEntries.join(",")}}`; // Join key-value pairs with commas
  }

  // Return undefined for unsupported types (functions, symbols, etc.)
  return undefined;
}
