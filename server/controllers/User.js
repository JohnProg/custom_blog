import Helper from './Helper';
import db from '../models';
import GraphQLCustomError from '../utils/GraphQLCustomError';
import Authenticate from '../middlewares/Authentication';

const { Op } = db.Sequelize;

const UserController = {
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
  },

  async updateUser(input) {
    const errors = [];
    Helper.validateInputs(input, []);
    const checkUser = await db.User.findOne({
      where: { userId: input.userId }
    });
    if (!checkUser) {
      errors.push({ key: '404', message: 'User not found' });
      throw new GraphQLCustomError(errors);
    }
    delete input.userId;
    const updatedUser = await checkUser.update(input);
    return updatedUser;
  },

  async deleteUser(userId) {
    const errors = [];
    const checkUser = await db.User.findOne({
      where: { userId }
    });
    if (!checkUser) {
      errors.push({ key: '404', message: 'User not found' });
      throw new GraphQLCustomError(errors);
    }
    checkUser.destroy();
    return 'Deleted';
  },

  async getAllUsers(input = {}) {
    Helper.validateInputs(input, []);
    const limit = input.limit || 10;
    const offset = input.offset || 0;
    const allUsers = await db.User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt']]
    });
    return allUsers.rows;
  },

  async searchUsers(input) {
    Helper.validateInputs(input, []);
    const limit = input.limit || 10;
    const offset = input.offset || 0;
    const checkQuery = input.q.toLowerCase().match(/\w+/g);
    const qArray = checkQuery.map(element => `%${element}%`);
    const searchResult = await db.User.findAndCountAll({
      where: {
        [Op.or]: [
          { userName: { [Op.iLike]: { [Op.any]: qArray } } },
          { email: { [Op.iLike]: { [Op.any]: qArray } } },
          { firstName: { [Op.iLike]: { [Op.any]: qArray } } },
          { lastName: { [Op.iLike]: { [Op.any]: qArray } } }]
      },
      limit,
      offset,
      order: [['createdAt']]
    });
    return searchResult.rows;
  },
};


export default UserController;
