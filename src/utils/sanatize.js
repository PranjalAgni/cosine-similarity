/** 
@param {string} text
*/
const preprocessText = (text) => {
  return text
    .trim()
    .replace(/[.|,]/, "")
    .split(" ")
    .map((word) => word.toLowerCase())
    .join(" ");
};

module.exports = {
  preprocessText
};
