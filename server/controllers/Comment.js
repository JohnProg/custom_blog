import db from '../models';

const CommentController = {
  getCommentsByBlogId(blogId) {
    return db.Comment.findAll({ where: { blogId } });
  }
};

export default CommentController;
