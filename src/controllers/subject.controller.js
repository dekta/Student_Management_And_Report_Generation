const { SubjectModel } = require('../models/subject.model')

/**
 * Retrieves subjects by grade level or all subjects if no grade level is specified.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - JSON response containing the retrieved subjects or an error message
 */
const getAllSubjectByGradeLevel = async (req, res) => {
  try {
    let grade = req.query.grade
    if (grade) {
      let subjectsByGrade = await SubjectModel.find({ gradeLevel: grade })
      res.status(201).json(subjectsByGrade)
    } else {
      let subjects = await SubjectModel.find()
      res.status(201).json(subjects)
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

const createSubject = async (req, res) => {
  const { name, gradeLevel } = req.body
  const subject = await SubjectModel.create({
    name: name.toLowerCase(),
    gradeLevel
  })
  res.status(201).json(subject)
}

module.exports = { getAllSubjectByGradeLevel, createSubject }
