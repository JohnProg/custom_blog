module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    userId: {
      type: DataTypes.UUID
    },
    followwerId: {
      type: DataTypes.UUID
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Follower;
};
