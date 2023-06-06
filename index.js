/** 
@param {string} text
*/
const preprocessText = (text) => {
  return text
    .trim()
    .split(' ')
    .map((word) => word.toLowerCase())
    .join(' ');
};

/** 
@param {string} text
*/
const getFrequencyMapOfText = (text) => {
  const freqMap = {};
  const words = text.split(' ');
  for (const word of words) {
    if (!freqMap[word]) freqMap[word] = 0;
    freqMap[word] += 1;
  }

  return freqMap;
};

const buildVocabulary = (vocabulary = {}) => {
  return (freqMap) => {
    for (const word in freqMap) {
      vocabulary[word] = true;
    }
  };
};

/** 
@param {string} sentenceA
@param {string} sentenceB
*/
const cosineSimilarity = (sentenceA, sentenceB) => {
  const freqMapA = getFrequencyMapOfText(sentenceA);
  const freqMapB = getFrequencyMapOfText(sentenceB);
  console.log({ freqMapA, freqMapB });
  const vocabulary = {};
  const addToVocabulary = buildVocabulary(vocabulary);
  addToVocabulary(freqMapA);
  addToVocabulary(freqMapB);
  return 42;
};

const main = () => {
  const text1 = 'This is the example of cosine similarity';
  const text2 = 'This examples implements the cosine simarity from scratch';
  console.log(cosineSimilarity(preprocessText(text1), preprocessText(text2)));
};

main();
