import pkg from 'graphql';
const { graphql } = pkg;

import { user_typeDefs } from './schema.user.js';
import { book_typeDefs } from './schema.books.js';

export const combined_TypeDefs = `#graphql
    ${user_typeDefs}
    ${book_typeDefs}
`;