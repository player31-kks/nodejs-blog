const { Router } = require("express");
const PostRouter = Router();

PostRouter.post("/", (req, res) => {
  return res.send("create post");
});

PostRouter.get("/", (req, res) => {
  return res.send("getAll post");
});

PostRouter.get("/:postId", (req, res) => {
  return res.send("get post");
});

PostRouter.put("/:postId", (req, res) => {
  return res.send("updated post");
});

module.exports = PostRouter;
