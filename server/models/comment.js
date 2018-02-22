module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
    },
    blogId: {
      type: DataTypes.UUID
    },
    userId: {
      type: DataTypes.UUID
    },
    status: {
      type: DataTypes.ENUM,
      values: ['published', 'archived'],
      defaultValue: 'published'
    }
  }, {
    classMethods: {
      associate({ Blog, User }) {
        Comment.belongsTo(User, { foreignKey: 'userId' });
        Comment.belongsTo(Blog, { foreignKey: 'blogId' });
      }
    }
  });
  return Comment;
};
