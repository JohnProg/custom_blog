const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

const UserDefaultRow = {
  user1: uuidv1(),
  user2: uuidv1(),
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        userId: UserDefaultRow.user1,
        userName: 'superadmin',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@localhost.com',
        password: bcrypt.hashSync('Passw0rd!', 10),
        role: 'superAdmin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: UserDefaultRow.user2,
        userName: 'admin',
        firstName: 'Regular',
        lastName: 'Admin',
        email: 'admin@localhost.com',
        password: bcrypt.hashSync('Passw0rd!', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};

module.exports = UserDefaultRow;
