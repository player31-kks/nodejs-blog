const { Post } = require("./post.model");

class PostService {
  async create(input) {
    const post = new Post({ ...input });
    return post.save();
  }

  async findById(id) {
    return Post.findById(id).select("-password");
  }

  async find() {
    return Post.find({});
  }
}

module.exports = new PostService();
