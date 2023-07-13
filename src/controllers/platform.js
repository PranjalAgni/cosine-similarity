const express = require("express");
const APIError = require("../exceptions/ApiError");
const { HttpStatusCode } = require("../constants");
const similarityService = require("../services/similarity.service");

const router = express.Router();

router.get("/yt/comments/:videoId", async (req, res, next) => {
  const videoId = req.params.videoId;
  try {
    if (!videoId) {
      const error = new APIError(
        "VideoId not passed",
        HttpStatusCode.BAD_REQUEST,
        {
          message: "Please pass videoId in the url",
          url: req.originalUrl
        },
        true
      );
      return next(error);
    }

    const similarComments = await similarityService.findSimilarYoutubeComments(
      videoId
    );

    return res.json({
      data: similarComments
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
