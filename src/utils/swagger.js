const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Student Management & Report Generation API',
    version: '1.0.0',
    description:
      'API documentation for student management and report generation'
  },
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
          password: 'john1234'
        }
      }
    }
  }
}

const options = {
  swaggerDefinition,
  apis: [
    './src/routes/auth.routes.js',
    './src/routes/marks.routes.js',
    './src/routes/student.routes.js',
    './src/routes/subject.routes.js'
  ]
}

module.exports = options
