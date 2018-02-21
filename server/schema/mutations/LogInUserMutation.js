import {
  GraphQLNonNull,
} from 'graphql';

import { UserInputType } from '../type/input';

import { UserController } from '../../controllers';

import LoggedInUserType from '../type/LoggedInUser';

const LogInUserMutation = {
  type: LoggedInUserType,
  args: {
    input: { type: new GraphQLNonNull(UserInputType) }
  },
  resolve(obj, args) {
    return UserController.signInUser(args.input);
  }
};

export default LogInUserMutation;

