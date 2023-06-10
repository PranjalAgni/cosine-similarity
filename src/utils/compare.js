const { cosineSimilarity } = require("../lib");

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
      const similarityScore = cosineSimilarity(targetTweet, currentTweet);
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
  compareTwitterReplies
};
