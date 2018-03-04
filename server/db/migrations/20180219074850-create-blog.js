
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      blogId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING
      },
      subTitle: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ['draft', 'published', 'archived'],
        defaultValue: 'draft'
      },
      category: {
        type: Sequelize.ENUM,
        values: ['default', 'technology', 'politics', 'sport', 'motivation'],
        defaultValue: 'default'
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
  down: queryInterface => queryInterface.dropTable('Blogs')
};
