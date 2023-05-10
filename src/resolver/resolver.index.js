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

const authors = [
    { name: 'Robert Greene' }, { name: 'josh cavil' }, { name: 'Henry cavil' }, { name: 'John Doe' }
]


export const resolvers = {
    Query: {
        books: () => {
            return books;
        },

        authors: () => {
            return authors
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


        getBooksByAuthor: (parent, args) => {
            const booksWithAuthor = books.filter(book => book.author.toLowerCase().includes(args.author));
            if (booksWithAuthor.length > 0) {
                return booksWithAuthor
            } else {
                throw new GraphQLError(
                    'There is no book with the given author ' + args.author,
                    {
                        extensions: {
                            code: 'AUTHOR_NOT_FOUND',
                        },
                    }
                );
            }
        },

        getBookByID: (parent, args) => {
            const fetchedBook = books.find(args.id)
            console.log(fetchedBook);
            if (fetchedBook) {
                return fetchedBook;
            } else {
                throw new GraphQLError(
                    'There is no book with the given ID ' + args.id,
                    {
                        extensions: {
                            code: 'BOOK_NOT_FOUND',
                        },  
                    }
                );
            }
        }
















    }
}
