import { GraphQLError } from 'graphql';
import { MESSAGES } from '../config/constant.config.js';
import myUser from '../model/user.model.js';
import { isValidId } from '../utils/mongo.ID.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'



export const user_resolvers = {
    Query: {
        //find a user BY id
        fetchUserByID: async (_parent, args) => {
            let { id } = args;
            let findUser = await myUser.findById(id);
            if (findUser) {
                return findUser;
            } else {
                throw new GraphQLError({
                    message: MESSAGES.USER.NOT_FOUND,
                    extensions: {
                        code: 404,
                    },
                });
            }
        },
    },

    //MUTATION
    Mutation: {
        //create user
        createUser: (_parent, args, _context, _info) => {
            //check if email exist
            let { email, username } = args.input;
            let find_email = myUser.find(email);
            let find_username = myUser.find(username);

            if (find_email.length > 0) {
                throw new GraphQLError(MESSAGES.USER.DUPLICATE_EMAIL, {
                    extensions: {
                        code: 409,
                    },
                });
            }
            //check if username exist
            else if (find_username.length > 0) {
                throw new GraphQLError(MESSAGES.USER.DUPLICATE_USERNAME, {
                    extensions: {
                        code: 409,
                    },
                });
            } else {
                //else, save the details
                let newUser = new myUser(args.input);
                let saved = newUser.save();
                return saved;
            }
        },

        //login user
        login: async (_parent, args, context) => {
            //confirm if an email and password is inputed
            const { email, password } = args
            if (!email) {
                return 'enter email';
            }
            if (!password) {
                return 'enter password';
            }

            // check if the email exists in the database
            const user = await myUser.find({ email: email });
            if (!user) {
                return {
                    success: false,
                    message: 'Login unsuccessful, register',
                };
            }

            // compare the inputted password with the database password
            const check = await bcrypt.compare(password, user[0].password);
            if (!check) {
                return {
                    message: 'wrong password',
                    success: false,
                };
            }

            //sign a token to the user
            const token = jwt.sign({ userId: user[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return {
                message: 'Login Successful',
                success: true,
                token: token,
            };
        },



        // delete user
        DeleteUserByID: async (_parent, args) => {
            let { id } = args;
            //check if the id is valid
            if (isValidId(id)) {
                //check if the user with the id exists
                const findUser = await myUser.findById(id);
                if (findUser) {
                    //if the user exists, delete the user
                    const deleteUser = await myUser.findByIdAndDelete(id);
                    return deleteUser
                        ? MESSAGES.USER.ACCOUNT_DELETED
                        : MESSAGES.USER.NOT_ACCOUNT_DELETED;
                } else {
                    // if no user was found then throw error
                    throw new GraphQLError({
                        message: MESSAGES.USER.NOT_FOUND,
                        extensions: {
                            success: false,
                            code: 404,
                        },
                    });
                }
            } else {
                //if the id provided is not valid
                throw new GraphQLError({
                    message: MESSAGES.USER.INCORRECT_DETAILS,
                    extensions: {
                        success: false,
                        code: 500,
                    },
                });
            }
        },

        //update user
        updateUserByID: (_parent, args) => {
            let { id, input } = args;
            //check if the id is valid
            if (isValidId(id)) {
                //check if the user with the id exists
                const findUser = myUser.findById(id);
                if (findUser) {
                    //update the user with the id provided
                    const updated = myUser.findByIdAndUpdate(id, input);
                    return updated;
                } else {
                    //if no user was found with the provided id throw error
                    throw new GraphQLError({
                        message: MESSAGES.USER.NOT_FOUND,
                        extensions: {
                            success: false,
                            code: 404,
                        },
                    });
                }
            } else {
                throw new GraphQLError(
                    //if the id provided is not valid
                    {
                        message: MESSAGES.USER.INCORRECT_DETAILS,
                        extensions: {
                            success: false,
                            code: 500,
                        },
                    }
                );
            }
        },

        //update a user
        updateUserByID: async (_parent, args) => {
            const { id, input } = args;
            // check if user exist with the given id
            const user = await myUser.findById(id);
            if (!user) {
                return;
            } else if (user) {
                //update the user with the id provided
                const updatedUser = await myUser.findByIdAndUpdate(id, input);
                return updatedResult ? 'successfully updated' : 'updated unsuccessful';
            } else {
                throw new GraphQLError({
                    message: MESSAGES.USER.ERROR,
                    extensions: {
                        success: false,
                        code: 500,
                    },
                });
            }
        },

        //logout
        logout: (parent, args, context) => {
            const { token } = context;
            // context.clearToken();
            return true;
        }
    },
};
