const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management & Report Generation API',
      version: '1.0.0',
      description:
        'API documentation for student management and report generation'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ],
    components: {
      schemas: {
        Auth: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'Name of user'
            },
            email: {
              type: 'string',
              description: 'User email'
            },
            password: {
              type: 'string',
              description: 'User Password'
            }
          },
          example: {
            name: 'John Doe',
            email: 'john@gmail.com',
            password: 'john123'
          }
        }
      },
      responses: {
        400: {
          description:
            'Missing API key - include it in the Authorization header',
          contents: 'application/json'
        },
        401: {
          description: 'Unauthorized - incorrect API key or incorrect format',
          contents: 'application/json'
        },
        404: {
          description: 'Not found - the book was not found',
          contents: 'application/json'
        }
      },
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ]
  },
  apis: ['../routes/auth.routes.js']
}

module.exports = options
