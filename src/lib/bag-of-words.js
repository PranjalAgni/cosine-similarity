/** 
@param {string} text
*/
const getFrequencyMapOfText = (text) => {
  const freqMap = {};
  const words = text.split(" ");
  for (const word of words) {
    if (!freqMap[word]) freqMap[word] = 0;
    freqMap[word] += 1;
  }

  return freqMap;
};

/**
@param {object} vocabulary - All the unique words
@param {object} text - Text for which we want to build the vector
@returns {number[]}
*/
const bagOfWordVectorization = (vocabulary, text) => {
  const freqMap = getFrequencyMapOfText(text);
  const wordToVector = [];
  for (const term in vocabulary) {
    wordToVector.push(freqMap[term] || 0);
  }

  return wordToVector;
};

/** 
@param {number[]} vector
*/
const print = (vector) => {
  console.log(vector);
};

module.exports = bagOfWordVectorization;
