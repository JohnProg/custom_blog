import db from '../models';

import Helper from './Helper';

const { Op } = db.Sequelize;

const BlogController = {
  getBlogsByUserId(userId) {
    return db.Blog.findAll({
      where: { userId }
    });
  },

  async getBlogsByUserIds(userIds) {
    const blogs = await db.Blog.findAll({
      where: { userId: { [Op.in]: userIds } }
    });
    return Helper.orderedFor(blogs, userIds, 'userId', false);
  },

  async createNewBlogPost(input) {
    Helper.validateInputs(input, ['title', 'content', 'userId']);
    const blog = await db.Blog.create(input);
    return blog;
  }
};

export default BlogController;
