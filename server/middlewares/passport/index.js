const GraphQLStrategy = require('./stragegies');
const User = require('../../database/models/User');
exports.init = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });

  passport.use('graphql', new GraphQLStrategy(({ email, password }, done) => {
    User.findOne({ email }, (error, user) => {
      if(error) {
        return done(error);
      }

      if(!user) {
        return done(null, false);
      }
      user.validatePassword(password, (err, isMatch) => {
        if(err) {
          return done(err);
        }

        if(!isMatch) {
          return done(null, false);
        }

        if(isMatch) {
          return done(null, user);
        }
      });
    });
  }));
}
