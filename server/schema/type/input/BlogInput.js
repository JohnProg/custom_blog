import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const BlogInputType = new GraphQLInputObjectType({
  name: 'BlogInputType',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    userId: { type: GraphQLString }
  })
});

export default BlogInputType;
