module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      userName: {
        type: Sequelize.STRING,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      avatarUrl: {
        type: Sequelize.STRING
      },
      profilePictureUrl: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM,
        values: ['superAdmin', 'admin', 'moderator', 'regular', 'guest']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('Users')
};
