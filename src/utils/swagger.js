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
      Users: {
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
      },
      Subjects: {
        type: 'object',
        required: ['name', 'gradeLevel'],
        properties: {
          name: {
            type: 'string',
            description: 'Name of subject'
          },
          gradeLevel: {
            type: 'number',
            description: 'Grade Level'
          }
        },
        example: {
          name: 'maths',
          gradeLevel: 6
        }
      },
      Students: {
        type: 'object',
        required: ['name', 'motherName', 'age', 'grade'],
        properties: {
          name: {
            type: 'string',
            description: 'Name of student'
          },
          motherName: {
            type: 'string',
            description: 'Mother name'
          },
          age: {
            type: 'number',
            description: '12'
          },
          grade: {
            type: 'number',
            description: '6'
          }
        },
        example: {
          name: 'john',
          motherName: 'abc',
          age: 12,
          grade: 6
        }
      },
      Marks: {
        type: 'object',
        required: ['studentId', 'grade', 'subjects'],
        properties: {
          studentId: {
            type: 'string',
            description: 'Student Id'
          },
          grade: {
            type: 'number',
            description: '6'
          },
          subjects: {
            type: '[]',
            description: []
          }
        },
        example: {
          studentId: '123456789',
          grade: '6',
          subjects: [
            {
              subject: 'english',
              score: 60,
              _id: '65f5e55056f07d574829ca5e'
            },
            {
              subject: 'maths',
              score: 55,
              _id: '65f5e55056f07d574829ca5f'
            }
          ]
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
