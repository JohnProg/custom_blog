const dotenv = require('dotenv');

dotenv.config({ silence: true });

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DB_TEST_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres'
  }
};
