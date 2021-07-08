const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

//resolvers
const {
  portfolioQueriesResolvers,
  portfolioMutationsResolvers,
  userMutations,
} = require('./resolvers');

//types
const { portfolioTypes } = require('./types');
const { userTypes } = require('./types');
const { buildAuthContext } = require('./context');

//GRAPHQL MODELS
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');

exports.createApolloServer = () => {
  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }

    type Mutation {
      createPortfolio(portfolioInput: PortfolioInput): Portfolio
      updatePortfolio(id: ID, portfolioInput: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signUp(signUpInput: SignUpInput): String
      signIn(signInInput: SignInInput): String
      signOut: String
    }
  `;

  const resolvers = {
    Query: {
      ...portfolioQueriesResolvers,
    },
    Mutation: {
      ...portfolioMutationsResolvers,
      ...userMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      ...buildAuthContext(),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio')),
        User: new User(mongoose.model('User')),
      },
    }),
  });

  return apolloServer;
};
