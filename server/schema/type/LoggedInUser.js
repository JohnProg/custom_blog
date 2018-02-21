import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

const LoggedInUserType = new GraphQLObjectType({
  name: 'LoggedInUserType',
  fields: () => ({
    userId: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString }
  })
});

export default LoggedInUserType;
