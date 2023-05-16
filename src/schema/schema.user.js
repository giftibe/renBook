import pkg from 'graphql';
const { graphql } = pkg;

export const user_typeDefs = `#graphql

        type User {
            id: String!
            name: String!
            email: String!   
            avatarURL:String!
            username:String!
        }

        input userInput {
            name: String!
            email: String!
            avatarURL:String!    
            username:String!
            password:String!
        }


    type Query {
            users: [User!]
            fetchUserByID(ID: Int): User
            updateUserByID(ID: Int): User
        } 

            type Mutation{
            createUser(input: userInput): User!
        }
`;
