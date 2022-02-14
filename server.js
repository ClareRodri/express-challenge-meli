const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./src/routes');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(config.apiPrefix, routes)
app.listen(config.port, () => console.log(`Running in port ${config.port}`))

module.exports = {
  app
}
