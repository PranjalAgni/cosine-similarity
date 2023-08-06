const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YT_API_KEY
});

/**
 * Fetch comment list by the videoId
 * @param {string} videoId
 */
const fetchCommentsOfVideo = async (videoId, resultCount=50) => {
  const response = await youtube.commentThreads.list({
    part: ["snippet"],
    videoId,
    maxResults: resultCount
  });

  const commentsList = response?.data?.items?.map((item) => {
    const comment = item?.snippet?.topLevelComment?.snippet?.textOriginal;
    return comment;
  });

  return commentsList;
};

module.exports = { fetchCommentsOfVideo };
