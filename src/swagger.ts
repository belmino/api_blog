import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

const optionsOld = {
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: [path.resolve(__dirname, 'routes/*.js')],
    openapi: "3.0.0",
    host: 'localhost:3000',
    basePath: '/',
    swaggerDefinition: {
      // Like the one described here: https://swagger.io/specification/#infoObject
      info: {
        description: 'API to Blog in TypeScript',
        title: 'Blog API',
        version: '1.0.0',
      },
    },
};


const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      description: 'API to Blog in TypeScript',
      title: 'Blog API', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: [path.resolve(__dirname, "routes/*.js"), path.resolve(__dirname, "models/*.js")],
  host: 'localhost:3000',
  basePath: '/',
  components: {
    securityDefinitions: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header'
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
}

const specs = swaggerJSDoc(options);
export default specs;
