import {
  GraphQLEnumType
} from 'graphql';

const BlogPostStatusType = new GraphQLEnumType({
  name: 'BlogPostStatusType',
  values: {
    DRAFT: { value: 'draft' },
    PUBLISHED: { value: 'published' },
    ARCHIVED: { value: 'archived' }
  }
});

export default BlogPostStatusType;
