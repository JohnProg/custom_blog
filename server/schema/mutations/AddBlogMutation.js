import {
  GraphQLNonNull
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

export default AddBlogMutation;
