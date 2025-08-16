import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation ($register: UserInput!) {
    signin(register: $register) {
      id
      email
      role
    }
  }
`;

export const USER_UPDATE = gql`
  mutation ($userUpdate: UserEditInput!) {
    editUser(userUpdate: $userUpdate) {
      id
      email
      role
    }
  }
`;

export const USER_LOGIN = gql`
  mutation ($login: LoginInput!) {
    signup(login: $login) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

export const USER_PROFILE = gql`
  mutation ($newProfile: ProfileInput!) {
    profile(newProfile: $newProfile) {
      id
      name
      address
      phone
      imageUrl
      userId
    }
  }
`;
