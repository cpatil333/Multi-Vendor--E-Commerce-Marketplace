import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    role: String!
  }

  type Profile {
    id: ID!
    name: String
    address: String!
    phone: String!
    imageUrl: String!
    userId: String!
  }

  input UserInput {
    email: String!
    password: String!
    role: String!
  }
  input UserEditInput {
    id: ID!
    email: String!
    password: String!
    role: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }

  type Token {
    user: User
    token: String
  }

  input UpdateProfileInput {
    userId: String!
    name: String
    address: String!
    phone: String!
    imageUrl: String!
  }

  type Query {
    users: [User!]!
    userById(id: ID!): User!
    profiles: [Profile!]!
    profileById(userId: ID!): Profile!
  }

  type Mutation {
    signin(register: UserInput!): User!
    signup(login: LoginInput!): Token!
    editUser(userUpdate: UserEditInput!): User!
    profile(updateProfile: UpdateProfileInput!): Profile!
  }
`;
