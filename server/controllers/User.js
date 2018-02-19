import db from '../models';

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
  }
};

export default UserController;
