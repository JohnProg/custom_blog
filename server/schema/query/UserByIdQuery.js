import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import UserType from '../type/User';

const UserByIdQuery = {
  type: UserType,
  description: 'User info by Id',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (obj, args, ctx) => ctx.loaders.usersByUserIds.load(args.userId)
};

export default UserByIdQuery;
