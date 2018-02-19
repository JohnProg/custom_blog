import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    avatarUrl: {
      type: DataTypes.STRING
    },
    profilePictureUrl: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM,
      values: ['superAdmin', 'admin', 'moderator', 'regular', 'guest']
    }

  }, {
    classMethods: {
      associate: ({ Blog }) => {
        User.hasMany(Blog, { foreignKey: 'userId' });
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });

  // Instance methods
  User.prototype.hashPassword = function hashPassword() {
    const saltRounds = 10;
    bcrypt.hash(this.password, saltRounds, function hashP(err, hash) {
      this.password = hash;
    });
  };

  User.prototype.validatePassword = function valiatePassword(password) {
    return bcrypt.compare(password, this.password, (err, res) => res);
  };

  return User;
};
