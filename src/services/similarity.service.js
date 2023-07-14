const { fetchCommentsOfVideo } = require("../libs/platform/youtube");
const hf = require("../libs/embeddings/hf");
const { compareEmbeddings } = require("../utils/compare");
const APIError = require("../exceptions/ApiError");
const { HttpStatusCode } = require("../constants");

const findSimilarYoutubeComments = async (videoId) => {
  try {
    const commentsList = await fetchCommentsOfVideo(videoId);
    const commentsWithEmbeddings = await Promise.all(
      commentsList.map(async (comment) => {
        const embeddings = await hf.fetchEmbeddings(comment);
        return {
          text: comment,
          embeddings
        };
      })
    );

    const similarYoutubeComments = compareEmbeddings(commentsWithEmbeddings);
    return similarYoutubeComments;
  } catch (err) {
    throw new APIError(err.message, HttpStatusCode.INTERNAL_SERVER, err, true);
  }
};

module.exports = {
  findSimilarYoutubeComments
};
