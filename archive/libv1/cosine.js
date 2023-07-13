/**
@param {number[]} vectorA
@param {number[]} vectorB
*/
const dotProduct = (vectorA, vectorB) => {
  const N = vectorA.length;
  const M = vectorB.length;

  if (N !== M)
    throw new Error("Cannot calculate dotproduct as vector dimensions not match");

  let dotProductSum = 0;
  for (let idx = 0; idx < N; idx++) {
    dotProductSum += vectorA[idx] * vectorB[idx];
  }

  return dotProductSum;
};

/** 
@param {number[]} vector
*/
const magnitude = (vector) => {
  let magnitudeValue = 0;
  for (let idx = 0; idx < vector.length; idx++) {
    magnitudeValue += vector[idx] * vector[idx];
  }

  return Math.sqrt(magnitudeValue);
};

/**
1. Compute the dot product of the vectors
2. Compute their magnitude
3. Finally calculate the cosine similarity value
@param {number[]} vectorA
@param {number[]} vectorB
*/
const cosineSimilarity = (vectorA, vectorB) => {
  const dotProductValue = dotProduct(vectorA, vectorB);
  const magnitudeValue = magnitude(vectorA) * magnitude(vectorB);
  if (magnitudeValue === 0) return 0;
  return dotProductValue / magnitudeValue;
};

module.exports = cosineSimilarity;
