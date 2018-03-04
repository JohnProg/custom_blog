import { gql } from 'apollo-boost';

const getCurrentUser = gql`
  query getCurrentUser {
    CurrentUser {
      userId
      email
      userName
    }
  }
`;

export {
  getCurrentUser
};
