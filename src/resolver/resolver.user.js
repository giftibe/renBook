import { GraphQLError } from 'graphql';
import { MESSAGES } from '../config/constant.config.js';
import myUser from '../model/user.model.js'

export const user_resolvers = {
    Query: {
        //find a user BY id
        fetchUserByID: (_parent, args) => {
            let userID = args.id
            console.log(args);

            let findUser = myUser.findById(UserID)
            if (findUser) {
                return findUser
            } else {
                throw new GraphQLError({
                    message: MESSAGES.USER.NOT_FOUND,
                    extensions: {
                        code: 404,
                    }
                })
            }
        }
    },


    //MUTATION
    Mutation: {
        //create user
        createUser: async (_parent, args, _context, _info) => {
            //check if email exist
            let email = args.input.email
            let username = args.input.username
            let find_email = await myUser.find({ email })
            let find_username = await myUser.find({ username })

            if (find_email.length > 0) {
                throw new GraphQLError(
                    'Email already in use ' + args.input.email,
                    {
                        extensions: {
                            code: 409,
                        },
                    }
                );

            }
            //check if username exist
            else if (find_username.length > 0) {
                throw new GraphQLError(
                    'Username already in use ' + args.input.username,
                    {
                        extensions: {
                            code: 409,
                        },
                    }
                );
            }
            else {
                //else, save the details
                let newUser = new myUser({
                    name: args.input.name,
                    email: args.input.email,
                    avatarURL: args.input.avatarURL,
                    username: args.input.username,
                    password: args.input.password
                })
                let saved = newUser.save()
                return saved
            }
        },

    },






    //update book

    // delete books

    //
};
