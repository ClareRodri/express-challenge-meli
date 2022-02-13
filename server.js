const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./src/routes');
const config = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(config.apiPrefix, routes)

app.listen(config.port, () => console.log(`Running in port ${config.port}`))

module.exports = {
  app
}
