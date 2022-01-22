const { Router } = require("express");

const PostService = require("./post.service");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const PostRouter = Router();

PostRouter.post("/", async (req, res) => {
  const { title, content, user, password } = req.body;

  if (!title || typeof title !== "string") {
    return res.send({ success: false, msg: "title is not string" });
  }
  if (!content || typeof content !== "string") {
    return res.send({ success: false, msg: "content is not string" });
  }
  if (!user || typeof user !== "string") {
    return res.send({ success: false, msg: "user is not string" });
  }
  if (!password || typeof password !== "string") {
    return res.send({ success: false, msg: "password is not string" });
  }

  const post = await PostService.create({ title, content, user, password });
  return res.send({ success: true, data: post });
});

PostRouter.get("/", async (req, res) => {
  const posts = await PostService.find();
  return res.send({ success: true, data: posts });
});

PostRouter.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  if (!ObjectId.isValid(postId)) {
    return res.send({ success: false, msg: "postId is wrong" });
  }
  const post = await PostService.findById(postId);

  return res.send({ success: true, data: post });
});

PostRouter.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password, title, content } = req.body;

  if (!ObjectId.isValid(postId)) {
    return res.send({ success: false, msg: "postId is wrong" });
  }

  const isCorrectedPw = await PostService.checkPassWord(postId, password);
  if (!isCorrectedPw) {
    return res.send({ success: false, msg: "password is wrong" });
  }

  await PostService.updateById(postId, { title, content });
  return res.send({ success: true });
});

module.exports = PostRouter;
