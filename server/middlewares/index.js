const config = require('../config/dev');
const sessison = require('express-session');
const passport = require('passport');
exports.init = (server, db) => {
  require('./passport').init(passport);
  const sess = {
    name: 'portfolio-session',
    secret: config.SESSION_SECRET,
    cookie: { maxAge: 2 * 60 * 60 * 100},
    resave: false,
    saveUninitialized: false,
    store: db.initSessionStore()
  }

  server.use(sessison(sess));
  server.use(passport.initialize());
  server.use(passport.session());
}
