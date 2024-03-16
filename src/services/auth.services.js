const { AuthModel } = require('../models/auth.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { TOKEN_EXPIRATION_TIME } = require('../utils/constants')

/**
 * Controller function for user signup
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - JSON response indicating signup status
 */
const signup = async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await AuthModel.find({ email })
    if (!user.length) {
      bcrypt.hash(password, +process.env.SALT, async (err, hash) => {
        if (err) {
          res.status(500).json({
            message: 'Something went wrong'
          })
        } else {
          await AuthModel.create({ name, email, password: hash })
          res.status(201).json({ message: 'Signup successful' })
        }
      })
    } else {
      res.status(409).json({ message: 'User already exists' })
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

/**
 * Controller function for user login
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - JSON response indicating login status and JWT token
 */
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await AuthModel.findOne({ email })
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(400).json({
            message: 'Something went wrong.',
            error: 'Invalid credentials'
          })
        } else {
          if (result) {
            let token = jwt.sign({ userId: user._id }, process.env.SALT, {
              expiresIn: TOKEN_EXPIRATION_TIME
            })
            res.status(200).json({ message: 'Login successful', token })
          } else {
            res.status(401).json({ message: 'Invalid credentials' })
          }
        }
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

module.exports = { signup, login }
