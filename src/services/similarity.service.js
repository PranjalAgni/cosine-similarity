const { fetchCommentsOfVideo } = require("../libs/platform/youtube");
const hf = require("../libs/embeddings/hf");
const { compareEmbeddings } = require("../utils/compare");
const APIError = require("../exceptions/ApiError");
const { HttpStatusCode, THRESHOLD_SIMILARITY } = require("../constants");

const findSimilarYoutubeComments = async (videoId) => {
  try {
    const commentsList = await fetchCommentsOfVideo(videoId);
    const fetchEmbeddingPromises = commentsList.map((comment) =>
      hf.fetchEmbeddings(comment)
    );

    const commentsWithEmbeddingsSettled = await Promise.allSettled(
      fetchEmbeddingPromises
    );

    const commentsWithEmbeddings = commentsWithEmbeddingsSettled
      .map((settledPormise, idx) => {
        if (settledPormise.status === "rejected") return null;
        return {
          text: commentsList[idx],
          embeddings: settledPormise.value
        };
      })
      .filter((comment) => comment !== null);

    const similarYoutubeComments = compareEmbeddings(commentsWithEmbeddings);
    const similarYoutubeCommentsAboveThreshold = similarYoutubeComments.filter(
      (comment) => comment.similarityScore >= THRESHOLD_SIMILARITY
    );
    return similarYoutubeCommentsAboveThreshold;
  } catch (err) {
    console.error("Error finding similar youtube comments", err);
    throw new APIError(err.message, HttpStatusCode.INTERNAL_SERVER, err, true);
  }
};

module.exports = {
  findSimilarYoutubeComments
};
