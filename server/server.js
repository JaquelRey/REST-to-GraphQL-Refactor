const express = require('express');
const path = require('path');
const db = require('./config/connection');

const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require('./schemas/index.js');
const { ApolloServer } = require('apollo-server-express');

const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  })

  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
  }

  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);