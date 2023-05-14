import pkg from 'graphql';
const { graphql } = pkg;

export const typeDefs = `#graphql
        type Book {
            name: String!
            pages: Int
            author: String!  
            id: Int
        }

        type Mutation{
            createUser(input: userInput): User
        }
        
        type User {
            name: String!
            email: String!   
            avatarURL:String!
            username:String!
        }

        input userInput {
            name: String
            email: String
            avatarURL:String    
            username:String
            password:String
        }

        type Query {
            books: [Book!]  
            fetchBooksByAuthor(author: String): [Book]
            fetchBookByName(name: String): [Book!]
            fetchBookByID(ID: Int): Book
        }   
`;
