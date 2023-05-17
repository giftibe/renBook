import { GraphQLError } from 'graphql';
import { MESSAGES } from '../config/constant.config.js';
import myUser from '../model/user.model.js'
import { isValidId } from '../utils/mongo.ID.js';

export const user_resolvers = {
    Query: {
        //find a user BY id
        fetchUserByID: (_parent, args) => {
            let { id } = args

            let findUser = myUser.findById(id)
            if (findUser) {
                // console.log(findUser);
                return {
                    success: true,
                    code: 201,
                    findUser
                }
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
        createUser: (_parent, args, _context, _info) => {
            //check if email exist
            let { email, username, name, password, avatarURL, tel, imageTag } = args.input
            let find_email = myUser.find(email)
            let find_username = myUser.find(username)

            if (find_email.length > 0) {
                throw new GraphQLError(
                    'Email already in use ' + email,
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
                    'Username already in use ' + username,
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
                    name: name,
                    email: email,
                    avatarURL: avatarURL,
                    username: username,
                    password: password,
                    tel: tel,
                    imageTag: imageTag
                })
                let saved = newUser.save()
                return saved
            }
        },



        // delete user
        DeleteUserByID: (_parent, args) => {
            let { id } = args
            //check if the id is valid
            if (isValidId(id)) {
                //check if the user with the id exists
                const findUser = myUser.findById(id)
                if (findUser) {
                    //delete the user with the id provided
                    myUser.findByIdAndDelete(id)
                    return {
                        message: MESSAGES.USER.ACCOUNT_DELETED,
                        extensions: {
                            success: true,
                            code: 201,
                        }
                    }
                } else {
                    // if no user was found then throw error
                    throw new GraphQLError({
                        message: MESSAGES.USER.NOT_FOUND,
                        extensions: {
                            success: false,
                            code: 404,
                        }
                    })
                }
            } else {
                //if the id provided is not valid
                throw new GraphQLError(
                    {
                        message: MESSAGES.USER.INCORRECT_DETAILS,
                        extensions: {
                            success: false,
                            code: 500
                        }
                    }
                )
            }
        },

        //update user 
        updateUserByID: (_parent, args) => {
            let { id, input } = args

            //check if the id is valid
            if (isValidId(id)) {
                //check if the user with the id exists
                const findUser = myUser.findById(id)
                if (findUser) {
                    //update the user with the id provided
                    myUser.findByIdAndUpdate(id, input)
                    return {
                        message: MESSAGES.USER.ACCOUNT_UPDATED,
                        extensions: {
                            success: true,
                            code: 201,
                        }
                    }
                } else {
                    //if no user was found with the provided id throw error
                    throw new GraphQLError({
                        message: MESSAGES.USER.NOT_FOUND,
                        extensions: {
                            success: false,
                            code: 404,
                        }
                    })
                }
            } else {
                throw new GraphQLError(
                    //if the id provided is not valid
                    {
                        message: MESSAGES.USER.INCORRECT_DETAILS,
                        extensions: {
                            success: false,
                            code: 500
                        }
                    }
                )
            }
        }
    },


};
