export const user_typeDefs = `#graphql

        type User {
            id: String!
            name: String!
            email: String!   
            avatarURL:String!
            username:String!
            tel: String!
            role: String!
        }

        input userInput {
            name: String!
            email: String!
            avatarURL:String!    
            username:String!
            password:String!
            tel:String!            
        }

        type delOutput {
            name: String!
            email: String! 
        }

        type Query {
            users: [User!]
            fetchUserByID(id: ID!): User!
        } 

        scalar DeletionResult

        type Mutation{
            createUser(input: userInput!): User
            updateUserByID(id: ID!,input: userInput!): User!
            DeleteUserByID(id: ID!): DeletionResult
        }
`;
