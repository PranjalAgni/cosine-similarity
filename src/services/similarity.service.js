const { fetchCommentsOfVideo } = require("../libs/platform/youtube");
const hf = require("../libs/embeddings/hf");
const { compareEmbeddings } = require("../utils/compare");

const findSimilarYoutubeComments = async (videoId) => {
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
};

module.exports = {
  findSimilarYoutubeComments
};
