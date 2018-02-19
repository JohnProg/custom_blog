const uuidv1 = require('uuid/v1');
const userDefaultRow = require('./20180218191858-user');
const blogDefaultRow = require('./20180219081822-blog');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Comments', [
      {
        commentId: uuidv1(),
        content: 'Content of first blog post',
        blogId: blogDefaultRow.blogId1,
        userId: userDefaultRow.user2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentId: uuidv1(),
        content: 'Content of first blog post',
        blogId: blogDefaultRow.blogId1,
        userId: userDefaultRow.user1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentId: uuidv1(),
        content: 'Content of first blog post',
        blogId: blogDefaultRow.blogId1,
        userId: userDefaultRow.user1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        commentId: uuidv1(),
        content: 'Content of first blog post',
        blogId: blogDefaultRow.blogId1,
        userId: userDefaultRow.user2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Comments', null, {})
};
