import { gql } from 'apollo-boost';

const GetAllBlogsQuery = gql`
  query {
    AllBlog {
      blogId
      title
      content
      imgUrl
    }
  }
`;

const GetOneBlogQuery = gql`
  query ($blogId: String!) {
    OneBlog(blogId: $blogId) {
      blogId
      title
      content
      imgUrl
    }
  }
`;

export {
  GetAllBlogsQuery,
  GetOneBlogQuery
};
