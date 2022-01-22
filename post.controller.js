const { Router } = require("express");

const PostService = require("./post.service");
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

PostRouter.get("/:postId", (req, res) => {
  return res.send("get post");
});

PostRouter.put("/:postId", (req, res) => {
  return res.send("updated post");
});

module.exports = PostRouter;
