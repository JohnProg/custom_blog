import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

const userInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: () => ({
    userName: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export default userInputType;
