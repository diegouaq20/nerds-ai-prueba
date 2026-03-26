const swaggerJsdoc = require('swagger-jsdoc');

const serverUrl = process.env.RAILWAY_PUBLIC_DOMAIN 
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` 
  : 'http://localhost:3000';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Text Processing API',
      version: '1.0.0',
      description: 'API para procesar y manipular cadenas de texto',
    },
    servers: [{ url: serverUrl }],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);