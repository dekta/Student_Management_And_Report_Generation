const mongoose = require('mongoose')

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    motherName: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    grade: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const StudentModel = mongoose.model('student', studentSchema)

module.exports = { StudentModel }
