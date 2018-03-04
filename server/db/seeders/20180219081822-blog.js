const uuidv1 = require('uuid/v1');
const userDefaultRow = require('./20180218191858-user');

const blogDefaultRows = {
  blogId1: uuidv1(),
  blogId2: uuidv1(),
  blogId3: uuidv1(),
  up: queryInterface =>
    queryInterface.bulkInsert('Blogs', [
      {
        blogId: blogDefaultRows.blogId1,
        title: 'First Blog Post',
        content: 'Content of first blog post',
        imgUrl: 'url',
        status: 'draft',
        userId: userDefaultRow.user1,
        category: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        blogId: blogDefaultRows.blogId2,
        title: 'Second Blog Post',
        content: 'Content of second blog post',
        imgUrl: 'url',
        status: 'draft',
        userId: userDefaultRow.user1,
        category: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        blogId: blogDefaultRows.blogId3,
        title: 'Second Blog Post',
        content: 'Content of second blog post',
        imgUrl: 'url',
        status: 'draft',
        userId: userDefaultRow.user2,
        category: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Blogs', null, {})
};

module.exports = blogDefaultRows;
