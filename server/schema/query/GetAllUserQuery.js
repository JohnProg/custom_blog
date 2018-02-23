import {
  GraphQLString,
  GraphQLList
} from 'graphql';

import { UserController } from '../../controllers';
import UserType from '../type/User';

const GetAllUserQuery = {
  type: GraphQLList(UserType),
  args: {
    limit: { type: GraphQLString },
    offset: { type: GraphQLString }
  },
  resolve(obj, args) {
    return UserController.getAllUsers(args);
  }
};

export default GetAllUserQuery;
