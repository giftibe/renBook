import 'dotenv/config'
import 'colors'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { combined_TypeDefs } from './src/schema/schema.index.js';
import { combinedResolvers } from './src/resolver/resolver.index.js'
import { database } from './src/database/mongo.database.js'

const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
    typeDefs: combined_TypeDefs,
    resolvers: combinedResolvers,
});


const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => { { token: req.headers.token } },
    listen: { port: PORT }
}, database())

console.log(`🚀 ${'Server ready at:'.green} ${url.yellow}`)
console.log(`${'Query at: '.magenta} ${'http://studio.apollographql.com/dev'.yellow}`);
