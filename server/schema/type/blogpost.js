import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import BlogPostStatusType from './blogpoststatus';
import CommentType from './comment';
import { CommentController } from '../../controllers';

const BlogPostType = new GraphQLObjectType({
  name: 'BlogPostType',

  fields: () => {
    return {
      blogId: { type: GraphQLID },
      title: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(obj) {
          return obj.title;
        }
      },
      content: { type: GraphQLString },
      status: { type: BlogPostStatusType },
      userId: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      comments: {
        type: new GraphQLList(CommentType),
        resolve(obj) {
          return CommentController.getCommentsByBlogId(obj.blogId).then(comments => comments);
        }
      }
    };
  }
});

export default BlogPostType;
