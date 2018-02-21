import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import BlogPostType from './blogpost';

const MeType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    userId: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    },
    blogPosts: {
      type: new GraphQLList(BlogPostType),
      resolve(obj, args, { loaders }) {
        return loaders.blogsByUserIds.load(obj.userId);
      }
    }
  })
});

export default MeType;
