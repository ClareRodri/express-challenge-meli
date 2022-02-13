const swaggerAutogen = require('swagger-autogen')()
const config = require('./config');

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes.js']

const doc = {
    info: {
        title: 'Swagger Express API MELI!'
    },
    host: `localhost:${config.port}`,
    basePath: config.apiPrefix
};

swaggerAutogen(outputFile, endpointsFiles, doc)
