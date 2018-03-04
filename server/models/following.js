module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define('Following', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Following;
};
