
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    activityId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate({ User }) {
        Activity.belongsTo(User, { foreignKey: 'userId' });
      }
    }
  });
  return Activity;
};
