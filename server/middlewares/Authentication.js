import jwt from 'jsonwebtoken';

const secretKey = 'secret-value';

const Auth = {

  generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '365 days' });
    return token;
  },

  decodeToken(token) {
    return jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return 'Error';
      }
      return decoded;
    });
  }
};

export default Auth;
