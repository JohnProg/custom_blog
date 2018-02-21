import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

const CommentInputType = new GraphQLInputObjectType({
  name: 'CommentInputType',
  fields: () => ({
    content: { type: new GraphQLNonNull(GraphQLString) },
  })
});

export default CommentInputType;
