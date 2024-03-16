const mongoose = require('mongoose')

const marksSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true
    },
    grade: {
      type: Number,
      required: true
    },
    subjects: [
      {
        subject: {
          type: String,
          required: true
        },
        score: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const MarksModel = mongoose.model('marks', marksSchema)

module.exports = { MarksModel }
