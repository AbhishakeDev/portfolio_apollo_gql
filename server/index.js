const express = require('express');
const next = require('next');
const { ApolloServer, gql } = require('apollo-server-express');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

//resolvers
const {
  portfolioQueriesResolvers,
  portfolioMutationsResolvers,
} = require('./graphql/resolvers');
//types
const { portfolioTypes } = require('./graphql/types');

app.prepare().then(() => {
  const server = express();

  const typeDefs = gql`
    ${portfolioTypes}

    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }

    type Mutation {
      createPortfolio(portfolioInput: PortfolioInput): Portfolio
      updatePortfolio(id: ID, portfolioInput: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID
    }
  `;

  const resolvers = {
    Query: {
      ...portfolioQueriesResolvers,
    },
    Mutation: {
      ...portfolioMutationsResolvers,
    },
  };

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  apolloServer.applyMiddleware({ app: server });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
