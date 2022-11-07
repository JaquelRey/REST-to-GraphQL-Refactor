import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const QUERY_USER = gql`
query getUser($id: ID, $username: String){
  getUser(id: $id, username: $username) {
    _id
    username
    email
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;