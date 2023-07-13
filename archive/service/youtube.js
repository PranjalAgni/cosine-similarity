const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YT_API_KEY
});

/**
 * Fetch comment list by the videoId
 * @param {string} videoId
 */
const fetchCommentsByVideo = async (videoId) => {
  let commentsList = [];
  try {
    const response = await youtube.commentThreads.list({
      part: ["snippet"],
      videoId
    });

    commentsList = response.data.items.map((item) => {
      const comment = item?.snippet?.topLevelComment?.snippet?.textOriginal;
      return comment;
    });
  } catch (ex) {
    const exceptionDetails = {
      status: ex?.response?.status,
      message: ex?.response?.statusText
    };
    console.error("Error occured while fetching comments ", exceptionDetails);
  }
  return commentsList;
};

module.exports = { fetchCommentsByVideo };
