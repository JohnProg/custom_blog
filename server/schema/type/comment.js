import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

import UserProfileType from './UserProfile';

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => ({
    commentId: { type: GraphQLID },
    content: { type: GraphQLString },
    blogId: { type: GraphQLString },
    userInfo: {
      type: UserProfileType,
      resolve(obj, args, { loaders }) {
        return loaders.usersByUserIds.load(obj.userId);
      }
    }
  })
});

export default CommentType;
