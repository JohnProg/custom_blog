import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import { UserController } from '../controllers';
import UserType from './type/User';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      description: 'The mandatory hello field',
      resolve: () => 'Public Blog API'
    },
    User: {
      type: UserType,
      description: 'Info of the current user identified by userId',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args) => UserController.getUser(args.key)
    }
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: ''
});

export default ncSchema;
