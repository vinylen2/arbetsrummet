const Koa = require('koa');
const router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('./config.json');
const cors = require('koa2-cors');
const models = require('./models');

const app = new Koa();
require('koa-qs')(app, 'strict');

app.keys = ['secret', config.secret];
app.proxy = true;

// Set up body parsing middleware
app.use(bodyParser());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  allowMethods: ['GET', 'PATCH', 'POST'],
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

// Require the Router defined in words.js
const assignments = require('./routes/assignments.js');
const grades = require('./routes/grades.js');
const subjects = require('./routes/subjects.js');

app.listen(config.port);

models.connection.sync().then(() => {
  console.log(`Server listening on port: ${config.port}`);
  console.log('Sequelize synchronized');
  app.use(assignments.routes());
  app.use(grades.routes());
  app.use(subjects.routes());
});