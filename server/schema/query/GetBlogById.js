import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import BlogPostType from '../type/blogpost';

const GetBlogById = {
  type: BlogPostType,
  description: 'Get a blog post using blogId',
  args: {
    blogId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(obj, args, ctx) {
    return ctx.loaders.blogsByBlogIds.load(args.blogId);
  }
};

export default GetBlogById;
