import pkg from 'graphql';
const { graphql } = pkg;

export const typeDefs = `#graphql
        type Book {
            name: String!
            pages: Int
            author: String!  
            id: Int
        }


        
        type user {
            name: String!
            email: String!
            avatarURL:String!
            username:String!
        }

        type Query {
            books: [Book!]  
            fetchBooksByAuthor(author: String): [Book]
            fetchBookByName(name: String): [Book!]
            fetchBookByID(ID: Int): Book
  
        }   
`;
