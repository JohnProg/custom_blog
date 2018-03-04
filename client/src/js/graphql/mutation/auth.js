import { gql } from 'apollo-boost';

const RegisterUser = gql`
  mutation RegisterUser ($UserInput: UserInputType!) {
    AddUser(input: $UserInput){
      token
      userName
    }
  }
`;

const SignInUser = gql`
  mutation SignIn ($UserInput: UserInputType!) {
    LogInUser(input: $UserInput){
      userName
      token
    }
  }
`;

export {
  RegisterUser,
  SignInUser
};
