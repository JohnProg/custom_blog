
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    profileId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    blogProfileTitle: {
      type: DataTypes.STRING,
      defaultValue: 'Blog title'
    },
    blogProfileSubTile: {
      type: DataTypes.STRING,
      defaultValue: 'Blog sub title'
    },
    blogProfileImgLink: {
      type: DataTypes.STRING
    },
    blogProfileFacebookLink: {
      type: DataTypes.STRING
    },
    blogProfileTwitterLink: {
      type: DataTypes.STRING
    },
    blogProfileGithubLink: {
      type: DataTypes.STRING
    },
    blogProfileLinkedinLink: {
      type: DataTypes.STRING
    },
    blogProfileBio: {
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Profile;
};
