import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql';

const UserProfileType = new GraphQLObjectType({
  name: 'UserProfileType',
  fields: () => ({
    userId: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    }
  })
});

export default UserProfileType;
