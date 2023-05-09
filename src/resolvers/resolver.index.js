import { GraphQLError } from 'graphql';
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
        getBooksByAuthor: (_parent, args) => {
            const authorBooks = books.filter((book) => book.author === args.author);
            if (authorBooks.length > 0) {
                return authorBooks;
            } else {
                throw new GraphQLError(
                    'There is no book with the given author' + args.author,
                    {
                        extensions: {
                            code: 'BOOKS_NOT_FOUND',
                        },
                    }
                );
            }
        },

        getBookByName: (_parent, args) => {
            const booksWithname = books.filter(book => book.name.toLowerCase().includes(args.name));
            if (booksWithname.length > 0) {
                return booksWithname;
            } else
                throw new GraphQLError(
                    'There is no book with the given name ' + args.name,
                    {
                        extensions: {
                            code: 'BOOKS_NOT_FOUND',
                        },
                    }
                );
        }
    }
}
