module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      profileId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      blogProfileTitle: {
        type: Sequelize.STRING,
        defaultValue: 'Blog title'
      },
      blogProfileSubTile: {
        type: Sequelize.STRING,
        defaultValue: 'Blog sub title'
      },
      blogProfileImgLink: {
        type: Sequelize.STRING
      },
      blogProfileFacebookLink: {
        type: Sequelize.STRING
      },
      blogProfileTwitterLink: {
        type: Sequelize.STRING
      },
      blogProfileGithubLink: {
        type: Sequelize.STRING
      },
      blogProfileLinkedinLink: {
        type: Sequelize.STRING
      },
      blogProfileBio: {
        type: Sequelize.STRING
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
  down: queryInterface => queryInterface.dropTable('Profiles')
};
