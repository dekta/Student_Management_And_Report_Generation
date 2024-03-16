const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    gradeLevel: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const SubjectModel = mongoose.model('subject', subjectSchema)

module.exports = { SubjectModel }
