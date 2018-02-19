import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  fields: () => {
    return {
      commentId: { type: GraphQLID },
      content: { type: GraphQLString },
      blogId: { type: GraphQLString },
      userId: { type: GraphQLString }
    };
  }
});

export default CommentType;
