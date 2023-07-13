const cosineSimilarity = require("../libv1/cosine");
const bagOfWordVectorization = require("../libv1/bag-of-words");
const { removeDuplicateWords } = require("./text");
const { getEmbeddings } = require("../libv1/hf-embeddings");
/**
 *
 * @param {string[]} twitterReplies
 * @returns {Map<string, [number, string]>}
 */
const compareTwitterReplies = (twitterReplies) => {
  const totalReplies = twitterReplies.length;
  let tweetId = 0;
  /**
   * @type {Map<string, [number, string]>}
   */
  const tweetSimilarityMap = new Map();
  const matchedTweetsId = [];
  while (tweetId < totalReplies) {
    if (matchedTweetsId.includes(tweetId)) {
      console.log("This tweet is already visited");
      tweetId += 1;
      continue;
    }
    matchedTweetsId.push(tweetId);
    const targetTweet = twitterReplies[tweetId];
    let runningSimilarityScore = 0;
    let runningMatchingTweet = null;
    let runningMatchedTweetId = null;
    for (
      let currentTweetId = tweetId + 1;
      currentTweetId < totalReplies;
      currentTweetId++
    ) {
      if (matchedTweetsId.includes(currentTweetId)) {
        console.log("This tweet reply is already matched");
        continue;
      }
      // compare tweetId with currentTweetId
      const currentTweet = twitterReplies[currentTweetId];
      const vocabulary = removeDuplicateWords(`${targetTweet} ${currentTweet}`);
      const targetVector = bagOfWordVectorization(vocabulary, targetTweet);
      const currentVector = bagOfWordVectorization(vocabulary, currentTweet);
      const similarityScore = cosineSimilarity(targetVector, currentVector);
      console.log("Similarity score ", similarityScore);
      if (similarityScore > runningSimilarityScore) {
        runningSimilarityScore = similarityScore;
        runningMatchingTweet = currentTweet;
        runningMatchedTweetId = currentTweetId;
      }
    }

    if (runningMatchedTweetId) matchedTweetsId.push(runningMatchedTweetId);
    if (runningSimilarityScore) {
      tweetSimilarityMap.set(targetTweet, [
        runningSimilarityScore,
        runningMatchingTweet
      ]);
    }

    tweetId += 1;
  }

  return tweetSimilarityMap;
};

const compareTwitterRepliesWithEmbeddings = async (twitterReplies) => {
  const totalReplies = twitterReplies.length;
  let tweetId = 0;
  /**
   * @type {Map<string, [number, string]>}
   */
  const tweetSimilarityMap = new Map();
  const matchedTweetsId = [];
  while (tweetId < totalReplies) {
    if (matchedTweetsId.includes(tweetId)) {
      console.log("This tweet is already visited");
      tweetId += 1;
      continue;
    }
    matchedTweetsId.push(tweetId);
    const targetTweet = twitterReplies[tweetId];
    const targetEmbedding = await getEmbeddings(targetTweet);
    let runningSimilarityScore = 0;
    let runningMatchingTweet = null;
    let runningMatchedTweetId = null;
    for (
      let currentTweetId = tweetId + 1;
      currentTweetId < totalReplies;
      currentTweetId++
    ) {
      if (matchedTweetsId.includes(currentTweetId)) {
        console.log("This tweet reply is already matched");
        continue;
      }
      // compare tweetId with currentTweetId
      const currentTweet = twitterReplies[currentTweetId];
      const currentEmbedding = await getEmbeddings(currentTweet);
      const similarityScore = cosineSimilarity(targetEmbedding, currentEmbedding);
      console.log("Similarity score ", similarityScore);
      if (similarityScore > runningSimilarityScore) {
        runningSimilarityScore = similarityScore;
        runningMatchingTweet = currentTweet;
        runningMatchedTweetId = currentTweetId;
      }
    }

    if (runningMatchedTweetId) matchedTweetsId.push(runningMatchedTweetId);
    if (runningSimilarityScore) {
      tweetSimilarityMap.set(targetTweet, [
        runningSimilarityScore,
        runningMatchingTweet
      ]);
    }

    tweetId += 1;
  }

  return tweetSimilarityMap;
};

module.exports = {
  compareTwitterReplies,
  compareTwitterRepliesWithEmbeddings
};
