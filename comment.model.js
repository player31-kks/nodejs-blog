const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema(
  {
    user: { type: String, required: true },
    password: { type: String, required: true },
    content: { type: String, required: true },
    postId: { type: Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Post", CommentSchema);
module.exports = { Comment, CommentSchema };
