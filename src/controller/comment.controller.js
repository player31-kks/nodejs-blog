const { Router } = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

// const { transformLocalDateByMoment } = require("../../util");

const CommentService = require("../service/comment.service");

const CommentRouter = Router();

CommentRouter.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { user, content } = req.body;

  if (!user || typeof user !== "string") {
    return res.send({ success: false, msg: "user is not string" });
  }
  if (!content || typeof content !== "string") {
    return res.send({ success: false, msg: "content is not string" });
  }

  if (!ObjectId.isValid(postId)) {
    return res.send({ success: false, msg: "postId is wrong" });
  }

  const comment = await CommentService.save({ user, content, postId });
  res.send({ success: true, comment });
});

CommentRouter.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  await CommentService.deleteById(commentId);
  res.send({ success: true });
});

//delete부분
module.exports = CommentRouter;
