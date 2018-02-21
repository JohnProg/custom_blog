import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import BlogPostType from '../type/blogpost';
import { CommentInputType } from '../type/input';
import { GraphQLCustomError } from '../../utils';
import { CommentController } from '../../controllers';

const AddCommentMutation = {
  type: BlogPostType,
  args: {
    blogId: { type: new GraphQLNonNull(GraphQLString) },
    input: { type: new GraphQLNonNull(CommentInputType) }
  },
  resolve(obj, args, ctx) {
    if (ctx.authError && ctx.authError.length) {
      throw new GraphQLCustomError(ctx.authError);
    }
    const { userId } = ctx.authUser;
    const payload = {
      content: args.input.content,
      userId,
      blogId: args.blogId
    };
    return CommentController.createNewComment(payload);
  }
};

export default AddCommentMutation;
