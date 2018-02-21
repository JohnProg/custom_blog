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
    AddComment: AddCommentMutation
  })
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

export default ncSchema;
