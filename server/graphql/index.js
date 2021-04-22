const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
// resolvers
const { portfolioMutations, portfolioQueries, userMutations, userQueries } = require('./resolvers');
//types
const { portfolioTypes, userTypes } = require('./types');
const Portfolio = require('./models/Portfolio');
const User = require('./models/User');
const { buildAuthContext } =require('./context');
exports.createApolloServer = () => {
  const typeDefs = gql`
    ${ portfolioTypes }
    ${ userTypes }

    type Query {
      portfolio(id: ID): Portfolio,
      portfolios: [Portfolio],
      userPortfolios: [Portfolio]
      user: User
    }

    type Mutation {
      createPortfolio(portfolio: PortfolioInput): Portfolio
      updatePortfolio(id: ID, portfolio: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signIn(input: SignInInput): User
      signUp(input: SignUpInput): String
      signOut: Boolean
    }
  `;

  const resolvers = {
    Query: {
      ...portfolioQueries, ...userQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations
    }
  };

  const apolloServer = new ApolloServer({typeDefs, resolvers, 
    context: ({ req }) => ({ 
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio'), req.user),
        User: new User(mongoose.model('User'))
      } 
    })
  });
  
  return apolloServer;

}
