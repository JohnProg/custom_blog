module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      commentId: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      content: {
        type: Sequelize.TEXT
      },
      blogId: {
        type: Sequelize.UUID,
        reference: {
          models: 'Blogs',
          key: 'blogId'
        }
      },
      userId: {
        type: Sequelize.UUID,
        reference: {
          models: 'Users',
          key: 'userId'
        }
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
  down: queryInterface => queryInterface.dropTable('Comments')
};
