import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import {
  CurrentUserQuery,
  UserByIdQuery,
  HelloQuery,
  SearchBlogQuery,
  GetAllBlogQuery,
  GetAllUserQuery,
  SearchUserQuery,
  GetBlogByBlogId
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
    CurrentUser: CurrentUserQuery,
    SearchBlog: SearchBlogQuery,
    AllBlog: GetAllBlogQuery,
    AllUser: GetAllUserQuery,
    SearchUser: SearchUserQuery,
    OneBlog: GetBlogByBlogId
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
