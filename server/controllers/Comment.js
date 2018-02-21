import db from '../models';
import Helper from './Helper';
import { GraphQLCustomError } from '../utils';

const { Op } = db.Sequelize;

const CommentController = {
  getCommentsByBlogId(blogId) {
    return db.Comment.findAll({ where: { blogId } });
  },

  async getCommentsByBlogIds(blogIds) {
    const comments = await db.Comment.findAll({
      where: { blogId: { [Op.in]: blogIds } },
      order: [['createdAt', 'DESC']]
    });
    return Helper.orderedFor(comments, blogIds, 'blogId', false);
  },

  async createNewComment(input) {
    Helper.validateInputs(input, ['content', 'blogId', 'userId']);
    const blog = await db.Blog.findOne({ where: { blogId: input.blogId } });
    if (!blog) {
      throw new GraphQLCustomError([{ key: '404', message: 'Blog not found' }]);
    }
    const newComment = await db.Comment.create(input);
    const blogWithNewComment = await db.Blog.findOne({
      where: { blogId: newComment.blogId }
    });
    return blogWithNewComment;
  }
};

export default CommentController;
