const express = require('express')
const {
  studentRegister,
  getAllstudent,
  getStudentMarksReport,
  getStudentsWithPassPercentageOver50,
  deleteStudentWithData
} = require('../controllers/student.controllers')
const tokenValidator = require('../middlewares/auth.middleware')
const studentRouter = express.Router()

/**
 * @swagger
 * /student/register-student:
 *   post:
 *     summary: Register a new student
 *     description: Register a new student with the provided name, mother's name, age, and grade.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the student.
 *                 example: John Doe
 *               motherName:
 *                 type: string
 *                 description: The name of the student's mother.
 *                 example: Jane Doe
 *               age:
 *                 type: integer
 *                 description: The age of the student.
 *                 example: 12
 *               grade:
 *                 type: integer
 *                 description: The grade of the student.
 *                 example: 6
 *     responses:
 *       '201':
 *         description: Student registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message confirming the registration.
 *                   example: Student registered successfully.
 *       '409':
 *         description: Student already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating that the student already exists.
 *                   example: Student already exists.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating an internal server error.
 *                 error:
 *                   type: string
 *                   description: Additional details about the error.
 */

studentRouter.post('/register-student', tokenValidator, studentRegister)

/**
 * @swagger
 * /student/getallstudents:
 *   get:
 *     summary: Get all students
 *     description: Retrieve all students with their names and grades.
 *     responses:
 *       '200':
 *         description: A list of students with names and grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the student.
 *                     example: John Doe
 *                   grade:
 *                     type: integer
 *                     description: The grade of the student.
 *                     example: 6
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating an internal server error.
 *                   example: Internal server error occurred.
 *                 error:
 *                   type: string
 *                   description: Additional details about the error.
 */

studentRouter.get('/getallstudents', tokenValidator, getAllstudent)

/**
 * @swagger
 * /student/marks-report/{studentId}/:
 *   get:
 *     summary: Get marks report for a student.
 *     description: Retrieve the marks report for a student identified by the provided student ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to get marks report for.
 *     responses:
 *       200:
 *         description: Marks report retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 student:
 *                   type: object
 *                   description: Details of the student.
 *                 marksReport:
 *                   type: object
 *                   description: Marks report containing total marks, percentage, and subject-wise marks.
 *       404:
 *         description: Student not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
studentRouter.get(
  '/marksreport/:studentId',
  tokenValidator,
  getStudentMarksReport
)

/**
 * @swagger
 * /student/pass-percentage-over-50:
 *   get:
 *     summary: Get students with pass percentage over 50
 *     description: Retrieve students with their pass percentage over 50.
 *     responses:
 *       '200':
 *         description: A list of students with pass percentage over 50.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the student.
 *                     example: 60c8b1eb39eb55004f8a28c5
 *                   name:
 *                     type: string
 *                     description: The name of the student.
 *                     example: John Doe
 *                   motherName:
 *                     type: string
 *                     description: The mother's name of the student.
 *                     example: Jane Doe
 *                   age:
 *                     type: integer
 *                     description: The age of the student.
 *                     example: 12
 *                   grade:
 *                     type: integer
 *                     description: The grade of the student.
 *                     example: 6
 *                   passPercentage:
 *                     type: number
 *                     format: float
 *                     description: The pass percentage of the student.
 *                     example: 80.5
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating an internal server error.
 *                   example: Internal server error occurred.
 *                 error:
 *                   type: string
 *                   description: Additional details about the error.
 */
studentRouter.get(
  '/filter-pass-student',
  tokenValidator,
  getStudentsWithPassPercentageOver50
)

/**
 * @swagger
 * /student/{studentId}:
 *   delete:
 *     summary: Delete student with associated data
 *     description: Delete a student and associated marks data by student ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: The ID of the student to delete.
 *         schema:
 *           type: string
 *         example: 60c8b1eb39eb55004f8a28c5
 *     responses:
 *       '200':
 *         description: Student and associated marks deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the student and associated marks were deleted successfully.
 *                   example: Student and associated marks deleted successfully.
 *       '404':
 *         description: Student not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating that the student was not found.
 *                   example: Student not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message indicating an internal server error.
 *                   example: Internal server error occurred.
 */
studentRouter.delete(
  '/deletestudentwithdata/:studentId',
  deleteStudentWithData
)
module.exports = { studentRouter }
