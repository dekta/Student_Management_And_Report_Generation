const express = require('express')
const {
  studentRegister,
  getAllstudent
} = require('../controllers/student.controllers')
const tokenValidator = require('../middlewares/auth.middleware')
const studentRouter = express.Router()

/**
 * @swagger
 * /register-student:
 *   post:
 *     summary: Register a new student.
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
 *               motherName:
 *                 type: string
 *               age:
 *                 type: integer
 *               grade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Student registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Student already exists.
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
studentRouter.post('/register-student', tokenValidator, studentRegister)

/**
 * @swagger
 * /getallstudents:
 *   get:
 *     summary: Get all students.
 *     description: Retrieve all students with their names and grades.
 *     responses:
 *       200:
 *         description: A list of students with names and grades.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   grade:
 *                     type: integer
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
studentRouter.get('/getallstudents', tokenValidator, getAllstudent)

module.exports = { studentRouter }
