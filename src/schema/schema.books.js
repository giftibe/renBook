import pkg from 'graphql';

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

        input bookUpdate {
            name: String
            pages: Int
            author: String
            quantity: Int
            genre: String
        }
        scalar BookDeletion

        type Mutation{
            addbook(input: bookInput): Book!
            deleteBookByID(id: ID!): BookDeletion
            updateBookByID(id: ID!, input: bookUpdate):Book
        }

        type Query { 
            books: [Book!]  
            fetchBooksByAuthor(author: String): [Book!]
            fetchBookByName(name: String): [Book]
            fetchBookByID(id: ID!): Book
        }

`;
