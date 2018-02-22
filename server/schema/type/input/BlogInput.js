import {
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';

const BlogInputType = new GraphQLInputObjectType({
  name: 'BlogInputType',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    status: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
  })
});

export default BlogInputType;
