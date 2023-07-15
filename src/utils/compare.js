const cosineSimilarity = require("./cosine");

/**
 * Function to compare embeddings of text
 * @param {Array<{text: string, embeddings: number[]}>} textWithEmbeddings
 */
const compareEmbeddings = (textWithEmbeddings) => {
  const results = [];
  // Loop through each text and compare with the rest of the texts
  // and find the one with the highest similarity score
  // and push it to the results array
  for (let idx = 0; idx < textWithEmbeddings.length; idx++) {
    const sourceEmbedding = textWithEmbeddings[idx];
    let currentSimilarityScore = 0;
    let currentMatchedIndex;
    for (let jdx = idx + 1; jdx < textWithEmbeddings.length; jdx++) {
      const targetEmbedding = textWithEmbeddings[jdx];
      const similarityScore = cosineSimilarity(
        sourceEmbedding.embeddings,
        targetEmbedding.embeddings
      );
      if (similarityScore > currentSimilarityScore) {
        currentSimilarityScore = similarityScore;
        currentMatchedIndex = jdx;
      }
    }

    if (currentMatchedIndex) {
      results.push({
        text1: sourceEmbedding.text,
        text2: textWithEmbeddings[currentMatchedIndex].text,
        similarityScore: currentSimilarityScore
      });
      textWithEmbeddings.splice(currentMatchedIndex, 1);
    }
  }
  return results;
};

module.exports = {
  compareEmbeddings
};
