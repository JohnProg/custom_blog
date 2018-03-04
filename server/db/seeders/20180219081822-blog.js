const uuidv1 = require('uuid/v1');
const userDefaultRow = require('./20180218191858-user');

const content = `When I doubled down, my greatest risks were time and
  energy, because all of the time and energy I put into writing was
  could be used on my “traditional career path.” My college degree 
  was also getting stale, which seemed to be an employment risk 
  (“Why haven’t you used your degree?”). I didn’t know the probability
   of success, but the downside of losing time and energy to find out 
   was well worth the chance to live my dream. I believed in my ability 
   to figure out a career even if my writing attempt failed. My potential 
   gain was the ability to write for a living, and so far, that has 
   come to pass. With over 10,000 subscribers (it would be higher, 
   but I remove those who don’t open my emails) and popular books that 
   continue to sell in multiple languages, doubling down paid off.`;

const subTitle = ` So when you think about what you’re risking in 
  terms of time, money, and energy, and what you’re risking it for, 
  also consider the probability of those scenarios happening.`;

const blogDefaultRows = {
  blogId1: uuidv1(),
  blogId2: uuidv1(),
  blogId3: uuidv1(),
  up: queryInterface =>
    queryInterface.bulkInsert('Blogs', [
      {
        blogId: blogDefaultRows.blogId1,
        title: 'When to Quit and When to Double Down',
        subTitle,
        content,
        imgUrl: 'https://cdn-images-1.medium.com/max/1600/1*Eki3kQ78KoIlt_d6biIjoA.jpeg',
        status: 'draft',
        userId: userDefaultRow.user1,
        category: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        blogId: blogDefaultRows.blogId2,
        title: 'Do I quit, keep going, or double down?',
        subTitle,
        content,
        imgUrl: 'https://cdn-images-1.medium.com/max/1600/1*Eki3kQ78KoIlt_d6biIjoA.jpeg',
        status: 'draft',
        userId: userDefaultRow.user1,
        category: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        blogId: blogDefaultRows.blogId3,
        title: 'Quit, Stay, or Double Down',
        subTitle,
        content,
        imgUrl: 'https://cdn-images-1.medium.com/max/1600/1*Eki3kQ78KoIlt_d6biIjoA.jpeg',
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
