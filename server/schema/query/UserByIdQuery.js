import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import UserType from '../type/User';

const UserByIdQuery = {
  type: UserType,
  description: 'Info of the current user identified by userId',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (obj, args, ctx) => ctx.loaders.usersByUserIds.load(args.userId)
};

export default UserByIdQuery;
