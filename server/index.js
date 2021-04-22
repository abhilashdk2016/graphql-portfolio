const express = require('express')
const next = require('next')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const config = require('./config/dev');

const apolloServer = require('./graphql').createApolloServer();

const db = require('./database');
db.connect();

const sess = {
  name: 'portfolio-session',
  secret: config.SESSION_SECRET,
  cookie: { maxAge: 2 * 60 * 60 * 100},
  resave: false,
  saveUninitialized: false,
  store: db.initSessionStore()
}

app.prepare().then(() => {
  const server = express();
  require('./middlewares').init(server, db);
  apolloServer.applyMiddleware({ app: server });

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
