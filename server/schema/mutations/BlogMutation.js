import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import BlogPostType from '../type/blogpost';
import { BlogInputType } from '../type/input';
import { BlogController } from '../../controllers';
import { GraphQLCustomError } from '../../utils';

const AddBlogMutation = {
  type: BlogPostType,
  args: {
    input: { type: new GraphQLNonNull(BlogInputType) }
  },
  resolve(obj, args, ctx) {
    if (ctx.authError && ctx.authError.length) {
      throw new GraphQLCustomError(ctx.authError);
    }
    args.input.userId = ctx.authUser.userId;
    return BlogController.createNewBlogPost(args.input);
  }
};

const EditBlogMutation = {
  type: BlogPostType,
  args: {
    blogId: { type: new GraphQLNonNull(GraphQLString) },
    input: { type: BlogInputType }
  },
  resolve(obj, args, ctx) {
    if (ctx.authError && ctx.authError.length) {
      throw new GraphQLCustomError(ctx.authError);
    }
    args.input.userId = ctx.authUser.userId;
    args.input.blogId = args.blogId;
    return BlogController.updateBlogPost(args.input);
  }
};

const DeleteBlogMutation = {
  type: GraphQLString,
  args: {
    blogId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(obj, args, ctx) {
    if (ctx.authError && ctx.authError.length) {
      throw new GraphQLCustomError(ctx.authError);
    }
    const input = { blogId: args.blogId, userId: ctx.authUser.userId };
    return BlogController.deleteBlogPost(input);
  }
};

export {
  AddBlogMutation,
  EditBlogMutation,
  DeleteBlogMutation
};
