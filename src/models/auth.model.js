const mongoose = require('mongoose')

const authSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const AuthModel = mongoose.model('user', authSchema)

module.exports = { AuthModel }
