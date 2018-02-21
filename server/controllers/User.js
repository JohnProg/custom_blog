import Helper from './Helper';
import db from '../models';
import GraphQLCustomError from '../utils/GraphQLCustomError';
import Authenticate from '../middlewares/Authentication';

const { Op } = db.Sequelize;

const UserController = {
  getUser(userId) {
    return db.User.findOne({
      where: { userId }
    })
      .then((user) => {
        if (!user) {
          return 'Error';
        }
        return user;
      });
  },

  async getUsersByUserIds(userIds) {
    const users = await db.User.findAll({
      where: { userId: { [Op.in]: userIds } }
    });
    return Helper.orderedFor(users, userIds, 'userId', true);
  },

  async createNewUser(input) {
    const errors = [];
    Helper.validateInputs(input, ['email', 'password', 'userName']);
    const checkIfUserExist = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: input.email },
          { userName: input.userName }
        ]
      }
    });
    if (checkIfUserExist) {
      if (checkIfUserExist.email === input.email) {
        errors.push({ key: 'email', message: 'email already exist' });
      }
      if (checkIfUserExist.userName === input.userName) {
        errors.push({ key: 'userName', message: 'userName already exist' });
      }
      throw new GraphQLCustomError(errors);
    }
    const result = await db.User.create(input);
    return UserController.loggedInUser(result);
  },

  async signInUser(input) {
    Helper.validateInputs(input, ['email', 'password']);
    const result = await db.User.findOne({ where: { email: input.email } });
    if (result && result.validatePassword(input.password)) {
      return UserController.loggedInUser(result);
    }
    throw new GraphQLCustomError([{
      key: 'emailORpassword',
      message: 'Invalid email or password'
    }]);
  },

  loggedInUser(result) {
    const payload = { userId: result.userId, email: result.email };
    const token = Authenticate.generateToken(payload);
    result.token = token;
    return result;
  }
};


export default UserController;
