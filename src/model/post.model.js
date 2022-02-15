const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", PostSchema);
module.exports = { Post, PostSchema };
