/**
 * Safely formats a price with Naira symbol, handling different data types
 * @param {*} price - The price to format, can be number, string, or undefined
 * @param {boolean} includeSymbol - Whether to include the Naira symbol (₦)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, includeSymbol = true) => {
  const symbol = includeSymbol ? "₦" : "";

  if (typeof price === "number") {
    return `${symbol}${price.toFixed(2)}`;
  } else if (price) {
    return `${symbol}${price}`;
  }
  return "Price unavailable";
};

export default formatPrice;
