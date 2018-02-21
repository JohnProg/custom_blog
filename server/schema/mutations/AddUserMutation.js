import {
  GraphQLNonNull,
} from 'graphql';

import { UserInputType } from '../type/input';
import { UserController } from '../../controllers';
import LoggedInUserType from '../type/LoggedInUser';

const AddUserMutation = {
  type: LoggedInUserType,
  args: {
    input: { type: new GraphQLNonNull(UserInputType) }
  },
  resolve(obj, args) {
    return UserController.createNewUser(args.input);
  }
};

export default AddUserMutation;
