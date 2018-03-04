
const setToken = (token) => {
  localStorage.setItem('cb-token', token);
};

const getToken = () => localStorage.getItem('cb-token');

const decodeToken = () => {

};

const removeToken = () => {
  localStorage.removeItem('cb-token');
};

export {
  setToken,
  getToken,
  decodeToken,
  removeToken
};
