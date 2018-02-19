
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    blogId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT
    },
    imgUrl: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM,
      values: ['draft', 'published', 'archived']
    },
    userId: {
      type: DataTypes.UUID
    }
  }, {
    classMethods: {
      associate({ User }) {
        Blog.belongsTo(User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Blog;
};
