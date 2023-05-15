import { GraphQLError } from 'graphql';
import { MESSAGES } from '../config/constant.config.js';
import myUser from '../model/user.model.js'
import book_Model from '../model/book.model.js'


export const resolvers = {
    Query: {
        books: () => {
            return books;
        },

        // get books by searching authors
        fetchBooksByAuthor: (parent, args) => {
            const booksWithAuthor = books.filter((book) =>
                book.author.toLowerCase().includes(args.author)
            );
            if (booksWithAuthor.length > 0) {
                return booksWithAuthor;
            } else {
                throw new GraphQLError(
                    { message: MESSAGES.BOOK.BOOK_NOT_FOUND_BY_AUTHOR },
                    {
                        extensions: {
                            code: 404,
                        },
                    }
                );
            }
        },

        // get books by searching the book name
        fetchBookByName: (parent, args) => {
            const booksWithName = books.filter((book) =>
                book.name.toLowerCase().includes(args.name)
            );
            if (booksWithName.length > 0) {
                return booksWithAuthor;
            } else {
                throw new GraphQLError(
                    { message: MESSAGES.BOOK.BOOK_NOT_FOUND_BY_NAME },
                    {
                        extensions: {
                            code: 404,
                        },
                    }
                );
            }
        },

        // get books by searching the bookID
        fetchBookByID: (parent, args) => {
            const fetchedBook = books.find(args.id);
            console.log(fetchedBook);
            if (fetchedBook) {
                return fetchedBook;
            } else {
                throw new GraphQLError(
                    'There is no book with the given ID ' + args.id,
                    {
                        extensions: {
                            code: 404,
                        },
                    }
                );
            }
        },
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


        addbook: (_parent, args) => {
            let newBook = new book_Model({
                name: args.input.name,
                pages: args.input.pages,
                author: args.input.author,
                quantity: args.input.quantity,
                genre: args.input.genre
            })


            // console.log(newBook);
            const saved_book = newBook.save()
            if (saved_book) {
                return saved_book
            } else {
                throw new GraphQLError(
                    { message: MESSAGES.BOOK.BOOK_NOT_SAVED },
                    {
                        extensions: {
                            code: 409,
                        },
                    }
                );
            }
        }
    },





    //create books

    //update book

    // delete books

    //
};
