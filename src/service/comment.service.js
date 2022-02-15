const { Comment } = require("../model/comment.model");
const { transformLocalDateByMoment } = require("../../util");

class CommentService {
  async create(input) {
    const comment = new Comment({ ...input });
    return comment.save();
  }

  async findByPostId(postId) {
    const comment = await Comment.find({ postId }).select("-password").sort({ createdAt: "desc" });
    return transformLocalDateByMoment(comment);
  }

  async checkPassWord(commentId, password) {
    const comment = await Comment.findById(commentId);
    return comment.password === password ? true : false;
  }

  async updateById(commentId, input) {
    await Comment.findByIdAndUpdate(commentId, input);
  }

  async deleteById(commentId) {
    await Comment.deleteById(commentId);
  }
}

module.exports = new CommentService();
