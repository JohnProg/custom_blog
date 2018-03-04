import { gql } from 'apollo-boost';

const GetAllBlogsQuery = gql`
  query {
    AllBlog {
      blogId
      title
      content
      imgUrl
      subTitle
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
