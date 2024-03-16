const { MarksModel } = require('../models/marks.model')
const { StudentModel } = require('../models/student.model')

/**
 * Add marks for a student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addMarks = async (req, res) => {
  try {
    let studentId = req.params.studentId
    let { marks } = req.body || []
    if (!studentId || !marks) {
      res.status(404).json({ message: 'Invalid request' })
    }
    const student = await StudentModel.findById({ _id: studentId })
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    const alreadyAddedMarks = await MarksModel.findOne({
      studentId,
      grade: student.grade
    })
    if (alreadyAddedMarks) {
      return res.status(404).json({
        message: 'Student marks already added but you can edit the marks'
      })
    }
    const createdMarks = await MarksModel.create({
      studentId,
      grade: student.grade,
      subjects: marks
    })
    res.status(201).json(createdMarks)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

/**
 * Update marks for a student.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateMarks = async (req, res) => {
  try {
    let studentId = req.params.studentId
    let { marks } = req.body || []

    if (!studentId || !marks) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    const student = await StudentModel.findById(studentId)

    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    for (const mark of marks) {
      const filter = { studentId, 'subjects.subject': mark.subject }
      const update = { $set: { 'subjects.$.score': mark.score } }
      await MarksModel.updateOne(filter, update)
    }
    res.status(200).json({ message: 'Marks updated successfully' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

module.exports = { addMarks, updateMarks }
