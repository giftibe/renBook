import pkg from 'graphql';
const { graphql } = pkg;

export const book_typeDefs = `#graphql

        type Book {
            name: String!
            pages: Int!
            author: String!  
            quantity: Int! 
            genre: String!
            id: String!
        }

        input bookInput {
            name: String!
            pages: Int!
            author: String! 
            quantity: Int! 
            genre: String!
        }

        type Mutation{
            addbook(input: bookInput): Book!
            deleteBookByID(ID: Int): Book
        }

        type Query {
            books: [Book!]  
            fetchBooksByAuthor(author: String): [Book!]
            fetchBookByName(name: String): [Book!]
            fetchBookByID(ID: Int): Book
        }

`;
