import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import {
  CurrentUserQuery,
  UserByIdQuery,
  HelloQuery
} from './query';

import {
  AddUserMutation,
  LogInUserMutation,
  AddBlogMutation,
  EditBlogMutation,
  AddCommentMutation
} from './mutations';

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    hello: HelloQuery,
    UserById: UserByIdQuery,
    CurrentUser: CurrentUserQuery
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    AddUser: AddUserMutation,
    LogInUser: LogInUserMutation,
    AddBlog: AddBlogMutation,
    EditBlog: EditBlogMutation,
    AddComment: AddCommentMutation,
  })
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default ncSchema;
