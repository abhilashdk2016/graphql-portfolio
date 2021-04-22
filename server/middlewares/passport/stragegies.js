
const { Strategy } = require('passport-strategy');

class GraphQLStrategy extends Strategy {
  constructor(verify) {
    super();

    if(!verify) {
      throw new Error('GraphQLStrategy Requires a verify callback');
    }

    this.verify = verify;
    this.name = 'graphql';
  }

  authenticate(_, options) {
    const done= (error, user, info) => {
      if (error) {
        return this.error(error);
      }

      if(!user) {
        return this.fail(401);
      }

      return this.success(user, info);
    }
    this.verify(options, done);
  }
}

module.exports = GraphQLStrategy;
