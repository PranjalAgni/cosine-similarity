/** 
@param {string} text
*/
const preprocessText = (text) => {
  return text
    .trim()
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .map((word) => word.toLowerCase())
    .join(" ");
};

/**
 *
 * @param {string} text
 * @returns {string}
 */
const removeDuplicateWords = (text) => {
  const words = text.split(" ");
  const uniqueWords = new Set(words);
  return [...uniqueWords].join(" ");
};

module.exports = {
  preprocessText,
  removeDuplicateWords
};
