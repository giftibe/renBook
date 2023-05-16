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
            fetchUserByID(id: ID!): User
        } 

        type Mutation{
            createUser(input: userInput!): User!
            updateUserByID(id: ID!,input: userInput!): User!
            DeleteUserByID(id: ID!): User!
        }
`;
