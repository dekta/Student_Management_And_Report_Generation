require('dotenv').config()
const jwt = require('jsonwebtoken')

const tokenValidator = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.salt, function (err, decoded) {
    if (decoded) {
      req.headers.userId = decoded.userId
      next()
    } else {
      res.status(401).json({ message: 'Token expired' })
    }
  })
}

module.exports = tokenValidator
