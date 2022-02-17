const { Comment } = require("../model/comment.model");

class CommentService {
  async save(input) {
    const comment = new Comment({ ...input });
    await comment.save();
    return Comment.findById(comment._id);
  }

  async findByPostId(postId) {
    return Comment.find({ postId }).select("-password").sort({ createdAt: "desc" });
  }

  async checkPassWord(commentId, password) {
    const comment = await Comment.findById(commentId);
    return comment.password === password ? true : false;
  }

  async updateById(commentId, input) {
    await Comment.findByIdAndUpdate(commentId, input);
  }

  async deleteById(commentId) {
    await Comment.deleteOne({ _id: commentId });
  }
}

module.exports = new CommentService();
