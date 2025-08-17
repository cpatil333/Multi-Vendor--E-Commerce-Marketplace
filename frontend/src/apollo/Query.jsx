import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      email
      role
    }
  }
`;

export const GET_USER = gql`
  query ($userById: ID!) {
    userById(id: $userById) {
      id
      email
      role
    }
  }
`;

export const GET_PROFILE = gql`
  query ($userId: ID!) {
    profileById(userId: $userId) {
      id
      name
      address
      phone
      imageUrl
      userId
    }
  }
`;
