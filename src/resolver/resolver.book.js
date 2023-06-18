import { GraphQLError } from 'graphql';
import { MESSAGES } from '../config/constant.config.js';
import book_Model from '../model/book.model.js'

export const book_resolvers = {
    Query: {
        books: async (_parent, _args) => {
            return await book_Model.find()
        },

        fetchBooksByAuthor: async (_parent, args) => {
            let book_List = await book_Model.find()
            const booksWithAuthor = await book_List.filter((book) =>
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
        fetchBookByName: async (_parent, args) => {
            let { name } = args
            let book_List = await book_Model.find()
            const books_Name = await book_List.filter((book) =>
                book.name.toLowerCase().includes(name)
            );
            if (books_Name) {
                return books_Name;
            } else {
                throw new GraphQLError(
                    'There is no book with the given name ',
                    {
                        extensions: {
                            code: 404,
                        },
                    }
                );
            }
        },

        // get books by searching the bookID
        fetchBookByID: async (_parent, args) => {
            const fetchedBook = await book_Model.findById(args.id);
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
        }
    },




    Mutation: {
        addbook: (_parent, args) => {
            let newBook = new book_Model(args.input)
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
        },

        deleteBookByID(_parent, args) {
            const findBook = book_Model.find(args.id);
            if (findBook) {
                let { id } = args
                book_Model.findByIdAndDelete(id)
                return BookDeletion ? MESSAGES.BOOK.DELETED : MESSAGES.BOOK.BOOK_NOT_DELETED
            } else {
                throw new GraphQLError(
                    { message: MESSAGES.BOOK.BOOK_NOT_FOUND },
                    {
                        extensions: {
                            code: 409,
                        },
                    })
            }
        },
    }
}
