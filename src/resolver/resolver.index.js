import { GraphQLError } from 'graphql';
import { MESSAGES } from '../config/constant.config.js';

const books = [
    {
        id: 1,
        name: 'The Hitchhiker',
        pages: 5464,
        author: 'John Doe',
    },

    {
        id: 2,
        name: 'Harry Potter',
        pages: 164,
        author: 'Henry cavil',
    },

    {
        id: 2,
        name: 'Harry henfield',
        pages: 235,
        author: 'josh cavil',
    },

    {
        id: 2,
        name: "Mastery",
        pages: 386,
        author: 'Robert Greene'
    },

    {
        id: 2,
        name: "Laws of Human Nature",
        pages: 764,
        author: 'Robert Greene'
    }

];

export const resolvers = {
    Query: {
        books: () => {
            return books;
        },



        fetchBooksByAuthor: (parent, args) => {
            const booksWithAuthor = books.filter(book => book.author.toLowerCase().includes(args.author));
            if (booksWithAuthor.length > 0) {
                return booksWithAuthor
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

        fetchBookByName: (parent, args) => {
            const booksWithName = books.filter(book => book.name.toLowerCase().includes(args.name));
            if (booksWithName.length > 0) {
                return booksWithAuthor
            } else {
                throw new GraphQLError(
                    {message: MESSAGES.BOOK.BOOK_NOT_FOUND_BY_NAME},
                    {
                        extensions: {
                            code: 404,
                        },
                    }
                );
            }
        },

        fetchBookByID: (parent, args) => {
            const fetchedBook = books.find(args.id)
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
















    }
}
