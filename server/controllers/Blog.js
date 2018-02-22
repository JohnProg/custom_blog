import db from '../models';
import { GraphQLCustomError } from '../utils';

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
    const newBlog = await db.Blog.create(input);
    return newBlog;
  },

  async updateBlogPost(input) {
    const errors = [];
    Helper.validateInputs(input, []);
    const blogExist = await db.Blog.findOne({
      where: { blogId: input.blogId }
    });
    if (!blogExist) {
      errors.push({ key: '404', message: 'Blog not found' });
      throw new GraphQLCustomError(errors);
    }
    if (blogExist.userId !== input.userId) {
      errors.push({ key: 'Unauthorised', message: 'Not Authorised' });
      throw new GraphQLCustomError(errors);
    }
    delete input.userId;
    delete input.blogId;
    const updatedBlog = await blogExist.update(input);
    return updatedBlog;
  },

  async deleteBlogPost(input) {
    const errors = [];
    const blogExist = await db.Blog.findOne({
      where: { blogId: input.blogId }
    });
    if (!blogExist) {
      errors.push({ key: '404', message: 'Blog not found' });
      throw new GraphQLCustomError(errors);
    }
    if (input.userId !== blogExist.userId) {
      errors.push({ key: 'Unauthorised', message: 'Not Authorised' });
      throw new GraphQLCustomError(errors);
    }
    blogExist.destroy();
    return 'Deleted';
  },

  async getAllBlogs() {
    const allBlogs = await db.Blog.findAndCountAll();
    return allBlogs;
  },

  async searchBlogs(input) {
    const { q } = input;
    const searchResult = await db.Blog.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `${q}%` } },
          { content: { [Op.like]: `${q}%` } }]
      }
    });
    return searchResult;
  }
};

export default BlogController;
