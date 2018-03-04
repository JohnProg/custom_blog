import { gql } from 'apollo-boost';

const CreateBlogPost = gql`
  mutation($blogInput: BlogInputType!) {
    AddBlog(input: $blogInput) {
      blogId
      title
      content
    }
  }
`;

export default CreateBlogPost;
