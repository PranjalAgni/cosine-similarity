const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const { scrapeTweetReplies } = require("./lib");
const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("Query string ", req.query);

  const tweetUrl = req.query.tweetUrl;
  if (!tweetUrl)
    return res.json({
      message: "Twitter URL not specified"
    });

  const replies = await scrapeTweetReplies(tweetUrl);

  res.json({
    comments: replies
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
