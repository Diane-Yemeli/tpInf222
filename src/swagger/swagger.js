const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Blog API',
        version: '1.0.0',
        description: 'API Backend pour gestion d’articles (TAF1)',
    },
    servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec };