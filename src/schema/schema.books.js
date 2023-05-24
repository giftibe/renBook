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


        scalar BookDeletion


        type Mutation{
            addbook(input: bookInput): Book!
            deleteBookByID(ID: Int): BookDeletion
        }

        type Query {
            books: [Book!]  
            fetchBooksByAuthor(author: String): [Book!]
            fetchBookByName(name: String): [Book]
            fetchBookByID(id:String): Book
        }

`;
