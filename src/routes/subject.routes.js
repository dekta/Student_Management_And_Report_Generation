const express = require('express')
const {
  getAllSubjectByGradeLevel,
  createSubject
} = require('../controllers/subject.controller')
const tokenValidator = require('../middlewares/auth.middleware')

const subjectRouter = express.Router()

/**
 * @swagger
 * /subject/allsubjects:
 *   get:
 *     summary: Get all subjects filtered by grade level.
 *     description: Retrieve all subjects or filter by grade level.
 *     parameters:
 *       - in: query
 *         name: grade
 *         schema:
 *           type: integer
 *         required: false
 *         description: Grade level to filter the subjects.
 *     responses:
 *       200:
 *         description: A list of subjects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Internal server error.
 */
subjectRouter.get('/allsubjects', tokenValidator, getAllSubjectByGradeLevel)

/**
 * @swagger
 * /subject/createsubject:
 *   post:
 *     summary: Create a new subject.
 *     description: Create a new subject with the provided name and grade level.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gradeLevel:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Subject created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Internal server error.
 */
subjectRouter.post('/createsubject', tokenValidator, createSubject)

module.exports = { subjectRouter }
