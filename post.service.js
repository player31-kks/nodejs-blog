const { Post } = require("./post.model");
const { transformLocalDate } = require("./util");

class PostService {
  async create(input) {
    const post = new Post({ ...input });
    return post.save();
  }

  async findById(id) {
    const post = await Post.findById(id).select("-password");
    return transformLocalDate(post);
  }

  async checkPassWord(id, password) {
    const post = await Post.findById(id);
    return post.password === password ? true : false;
  }

  async find() {
    const posts = await Post.find({}).select("-password").sort({ createdAt: "desc" });
    return posts.map((post) => transformLocalDate(post));
  }

  async updateById(postId, input) {
    await Post.findByIdAndUpdate(postId, input);
  }
}

module.exports = new PostService();
