import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import BlogPostStatusType from './blogpoststatus';
import CommentType from './comment';

const BlogPostType = new GraphQLObjectType({
  name: 'BlogPostType',

  fields: () => ({
    blogId: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    status: { type: BlogPostStatusType },
    userId: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(obj, args, ctx) {
        return ctx.loaders.commentsByBlogIds.load(obj.blogId);
      }
    }
  })
});

export default BlogPostType;
