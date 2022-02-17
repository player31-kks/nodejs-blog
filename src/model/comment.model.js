const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema(
  {
    user: { type: String, required: true },
    password: { type: String },
    content: { type: String, required: true },
    postId: { type: Types.ObjectId, ref: "Post", required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Commnet", CommentSchema);
module.exports = { Comment, CommentSchema };
