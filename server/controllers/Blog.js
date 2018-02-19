import db from '../models';

const BlogController = {
  getBlogsByUserId(userId) {
    return db.Blog.findAll({
      where: { userId }
    });
  }
};

export default BlogController;
