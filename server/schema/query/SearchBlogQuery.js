import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import { BlogController } from '../../controllers';

import BlogPostType from '../type/blogpost';


const SearchBlogQuery = {
  type: GraphQLList(BlogPostType),
  description: 'Search blog',
  args: {
    q: { type: new GraphQLNonNull(GraphQLString), description: 'Search query' }
  },
  resolve(obj, args) {
    return BlogController.searchBlogs(args);
  }
};

export default SearchBlogQuery;
