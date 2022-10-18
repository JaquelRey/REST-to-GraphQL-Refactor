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
    _id: ID!
    authors: [String]
    description: String
    bookId: String!
    link: String
    image: String
    title: String!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savedBook): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
