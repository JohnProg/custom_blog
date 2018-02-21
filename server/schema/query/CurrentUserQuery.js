
import UserType from '../type/User';
import GraphQLCustomError from '../../utils/GraphQLCustomError';

const CurrentUserQuery = {
  type: UserType,
  description: 'Info of the current user identified by userId',
  resolve: (obj, args, ctx) => {
    if (ctx.authError.length) {
      throw new GraphQLCustomError(ctx.authError);
    }
    const { userId } = ctx.authUser;
    return ctx.loaders.usersByUserIds.load(userId);
  }
};

export default CurrentUserQuery;
