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

  async getBlogByBlogIds(blogIds) {
    const blogs = await db.Blog.findAll({
      where: { blogId: { [Op.in]: blogIds } }
    });
    return Helper.orderedFor(blogs, blogIds, 'blogId', true);
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

  async getAllBlogs(input = {}) {
    Helper.validateInputs(input, []);
    const limit = input.limit || 10;
    const offset = input.limit || 0;
    const allBlogs = await db.Blog.findAndCountAll({
      limit,
      offset,
      order: [['createdAt']]
    });
    return allBlogs.rows;
  },

  async searchBlogs(input) {
    Helper.validateInputs(input, []);
    const limit = input.limit || 10;
    const offset = input.offset || 0;
    const checkQuery = input.q.toLowerCase().match(/\w+/g);
    const qArray = checkQuery.map(element => `%${element}%`);
    const searchResult = await db.Blog.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: { [Op.any]: qArray } } },
          { content: { [Op.like]: { [Op.any]: qArray } } }]
      },
      limit,
      offset,
      order: [['createdAt']]
    });
    return searchResult.rows;
  },
};

export default BlogController;
