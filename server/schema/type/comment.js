import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

import UserType from './User';

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    commentId: { type: GraphQLID },
    content: { type: GraphQLString },
    blogId: { type: GraphQLString },
    userInfo: {
      type: UserType,
      resolve(obj, args, { loaders }) {
        return loaders.usersByUserIds.load(obj.userId);
      }
    }
  })
});

export default CommentType;
