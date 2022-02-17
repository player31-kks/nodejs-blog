const { Router } = require("express");

const PostService = require("../service/post.service");
const CommentService = require("../service/comment.service");
const mongoose = require("mongoose");
const { PostSchema } = require("../model/post.model");
const { ObjectId } = mongoose.Types;
const vaildationMiddleWare = require("../../vaildation");

const PostRouter = Router();

// vaildation을 middleWare에서 처리해서 logic에 집중할 수 있음
PostRouter.post("/", vaildationMiddleWare(PostSchema), async (req, res) => {
  const { title, content, user, password } = req.body;
  const post = await PostService.create({ title, content, user, password });
  return res.send({ success: true, data: post });
});

PostRouter.get("/", async (req, res) => {
  const posts = await PostService.find();
  return res.render("posts", { posts });
});

PostRouter.get("/form", (req, res) => {
  return res.render("form");
});

PostRouter.get("/:postId/updated", async (req, res) => {
  const { postId } = req.params;

  const post = await PostService.findById(postId);
  return res.render("updatedPost", { post });
});

PostRouter.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  if (!ObjectId.isValid(postId)) {
    return res.send({ success: false, msg: "postId is wrong" });
  }
  const post = await PostService.findById(postId);
  const comments = await CommentService.findByPostId(postId);

  return res.render("post", { post, comments });
});

PostRouter.put("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { password, title, content } = req.body;

  // 많은 validation을 해야함 ㅜㅜ
  if (!title || typeof title !== "string") {
    return res.send({ success: false, msg: "title is not string" });
  }
  if (!content || typeof content !== "string") {
    return res.send({ success: false, msg: "content is not string" });
  }
  if (!password || typeof password !== "string") {
    return res.send({ success: false, msg: "password is not string" });
  }
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

PostRouter.delete("/:postId", async (req, res) => {
  const { postId } = req.params;

  if (!ObjectId.isValid(postId)) {
    return res.send({ success: false, msg: "postId is wrong" });
  }

  await PostService.deleteById(postId);

  return res.send({ success: true });
});

module.exports = PostRouter;
