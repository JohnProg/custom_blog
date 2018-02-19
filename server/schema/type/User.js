import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import BlogPostType from './blogpost';
import { BlogController } from '../../controllers';

const MeType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => {
    return {
      userId: { type: GraphQLID },
      email: { type: new GraphQLNonNull(GraphQLString) },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      fullName: {
        type: GraphQLString,
        resolve: obj => `${obj.firstName} ${obj.lastName}`
      },
      blogPosts: {
        type: new GraphQLList(BlogPostType),
        resolve(obj, args, ctx) {
          return BlogController.getBlogsByUserId(obj.userId).then(res => res);
        }
      }
    };
  }
});

export default MeType;
