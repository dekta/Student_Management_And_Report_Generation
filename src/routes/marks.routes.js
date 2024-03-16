const express = require('express')
const { addMarks, updateMarks } = require('../controllers/marks.controller')
const tokenValidator = require('../middlewares/auth.middleware')
const marksRouter = express.Router()

/**
 * @swagger
 * /marks/addmarks/{studentId}:
 *   post:
 *     summary: Add marks for a student.
 *     description: Add marks for a student identified by the provided student ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to add marks for.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     subjectId:
 *                       type: string
 *                     score:
 *                       type: number
 *             example:
 *               marks:
 *                 - subjectId: "subject_id_1"
 *                   score: 85
 *                 - subjectId: "subject_id_2"
 *                   score: 90
 *     responses:
 *       201:
 *         description: Marks added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Marks'
 *       404:
 *         description: Invalid request or student not found.
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
marksRouter.post('/addmarks/:studentId', tokenValidator, addMarks)

/**
 * @swagger
 * /marks/updatemarks/{studentId}:
 *   put:
 *     summary: Update marks for a student.
 *     description: Update marks for a student identified by the provided student ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student to update marks for.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     subject:
 *                       type: string
 *                     score:
 *                       type: number
 *             example:
 *               marks:
 *                 - subject: "subject_id_1"
 *                   score: 85
 *                 - subject: "subject_id_2"
 *                   score: 90
 *     responses:
 *       200:
 *         description: Marks updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
marksRouter.put('/updatemarks/:studentId', tokenValidator, updateMarks)

module.exports = { marksRouter }
