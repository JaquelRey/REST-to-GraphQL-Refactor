const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedbooks: [Book]
  }

  type Query {
    me: User
    getUser(id: ID, username: String): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String
    bookId: String!
    link: String
    image: String
    title: String!
  }

  input savedBook {
    authors: [String]
    description: String
    bookId: String!
    link: String
    image: String
    title: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(input: savedBook): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
