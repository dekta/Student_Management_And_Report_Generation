const express = require('express')
const { signup, login } = require('../services/auth.services')
const { validate } = require('../middlewares/credentialsValidation')

const authRouter = express.Router()

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup successful
 *       404:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
authRouter.post('/signup', validate, signup)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
authRouter.post('/login', login)

module.exports = { authRouter }
