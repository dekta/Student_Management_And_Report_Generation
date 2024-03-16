const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const options = require('./src/utils/swagger')
const { db_connection } = require('./src/config/db')
const { authRouter } = require('./src/routes/auth.routes')
const { studentRouter } = require('./src/routes/student.routes')
const { marksRouter } = require('./src/routes/marks.routes')
const { subjectRouter } = require('./src/routes/subject.routes')

const app = express()
app.use(express.json())
app.use('/auth', authRouter)
app.use('/student', studentRouter)
app.use('/marks', marksRouter)
app.use('/subject', subjectRouter)
const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  db_connection
  console.log(`Server is running on port ${PORT}`)
})
