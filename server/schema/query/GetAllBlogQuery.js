import {
  GraphQLString,
  GraphQLList
} from 'graphql';

import BlogPostType from '../type/blogpost';
import { BlogController } from '../../controllers';

const GetAllBlogQuery = {
  type: GraphQLList(BlogPostType),
  description: 'Get all blog posts',
  args: {
    limit: { type: GraphQLString },
    offset: { type: GraphQLString }
  },
  resolve(obj, args, ctx) {
    return BlogController.getAllBlogs(args);
  }
};

export default GetAllBlogQuery;
