require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const { scrapeTweetReplies } = require("./lib");
const {
  compareTwitterReplies,
  compareTwitterRepliesWithEmbeddings
} = require("./utils/compare");
const { preprocessText } = require("./utils/text");
const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("Query string ", req.query);

  const tweetUrl = req.query.tweetUrl;
  const isOpenAI = req.query?.openai ?? false;
  console.log("isOpenAI ", isOpenAI);
  if (!tweetUrl)
    return res.json({
      message: "Twitter URL not specified"
    });

  const replies = (await scrapeTweetReplies(tweetUrl)) ?? [];
  const preprocessedReplies = replies.map((reply) => preprocessText(reply));
  const tweetSimilarityMap = isOpenAI
    ? await compareTwitterRepliesWithEmbeddings(preprocessedReplies)
    : compareTwitterReplies(preprocessedReplies);
  let responseObject = {};
  for (const [targetTweet, [similarityScore, matchingTweet]] of tweetSimilarityMap) {
    responseObject[targetTweet] = {
      score: similarityScore,
      match: matchingTweet
    };
  }
  return res.json({
    cosineSimilarity: responseObject
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
