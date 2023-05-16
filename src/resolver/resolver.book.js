import { GraphQLError } from 'graphql';
import { MESSAGES } from '../config/constant.config.js';
import book_Model from '../model/book.model.js'

export const book_resolvers = {
    Query: {
        books: () => {
            return books;
        },

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

}
