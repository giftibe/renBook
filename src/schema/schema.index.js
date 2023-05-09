import pkg from 'graphql';
const { graphql } = pkg;

export const typeDefs = `#graphql
        type Book {
            name: String!
            pages: Int
            author: String  
            id: Int
            }

        type Query {
            books: [Book!]  
            getBooksByAuthor(author: String): [Book!]
            getBookByName(name: String): [Book!]!
            getBookByID(ID: Int): Book
        }   
`;
