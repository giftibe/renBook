import { book_resolvers } from "./resolver.book.js";
import { user_resolvers } from "./resolver.user.js";

export const combinedResolvers = Object.assign({}, user_resolvers, book_resolvers);