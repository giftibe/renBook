import { book_resolvers } from "./resolver.book.js";
import { user_resolvers } from "./resolver.user.js";

export const combined_Resolvers = ([user_resolvers, book_resolvers])