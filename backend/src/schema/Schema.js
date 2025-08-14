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

  input LoginInput {
    email: String!
    password: String!
  }

  type Token {
    user: User
    token: String
  }

  input ProfileInput {
    name: String
    address: String!
    phone: String!
    userId: String!
  }
  
  type Query {
    users: [User!]!
    profiles: [Profile!]!
  }

  type Mutation {
    signin(register: UserInput!): User!
    signup(login: LoginInput!): Token!
    profile(newProfile: ProfileInput!): Profile!
  }
`;
