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
Builds a vocabulary object which contains all the unique
words across document
@param {object} vocabulary
*/
const buildVocabulary = (vocabulary = {}) => {
  return (freqMap) => {
    for (const word in freqMap) {
      vocabulary[word] = true;
    }
  };
};

/** 
@param {object} vocabulary - All the unique words
@param {object} freqMap - Frequency of each word in a document
*/
const wordToVector = (vocabulary, freqMap) => {
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

/**
1. Calculate the frequencey of both sentence
2. Build a vocabulary list which contains all the unique words across both sentences
3. Convert the frequency map to vectors for both sentence
4. Compute the dot product of the vectors
5. Compute their magnitude
6. Finally calculate the cosine similarity value
@param {string} sentenceA
@param {string} sentenceB
*/
const bagOfWordVectors = (sentenceA, sentenceB) => {
  const freqMapA = getFrequencyMapOfText(sentenceA);
  const freqMapB = getFrequencyMapOfText(sentenceB);
  const vocabulary = {};
  const addToVocabulary = buildVocabulary(vocabulary);
  addToVocabulary(freqMapA);
  addToVocabulary(freqMapB);
  const vectorA = wordToVector(vocabulary, freqMapA);
  const vectorB = wordToVector(vocabulary, freqMapB);
};

module.exports = bagOfWordVectors;
