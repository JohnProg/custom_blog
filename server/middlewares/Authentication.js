import jwt from 'jsonwebtoken';

const secretKey = 'secret-value';

const Auth = {

  generateToken(payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '365 days' });
    return token;
  },

  decodeToken(req) {
    const errors = [];
    const token = req.headers['cb-token'];
    if (!token) {
      errors.push({ key: 'token', message: 'token not available' });
      req.errors = errors;
      req.auth = {};
      return;
    }
    return jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        errors.push({ key: 'token', message: 'Invalid token provided' });
        req.errors = errors;
        req.auth = {};
        return;
      }
      req.errors = errors;
      req.auth = decoded;
    });
  }
};

export default Auth;
