import {
  GraphQLString,
  GraphQLList
} from 'graphql';

import UserType from '../type/User';
import { UserController } from '../../controllers';

const SearchUserQuery = {
  type: GraphQLList(UserType),
  args: {
    q: { type: GraphQLString },
    limit: { type: GraphQLString },
    offsite: { type: GraphQLString }
  },
  resolve(obj, args) {
    return UserController.searchUsers(args);
  }
};

export default SearchUserQuery;
