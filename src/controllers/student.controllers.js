const { StudentModel } = require('../models/student.model')

/**
 * Registers a new student with the provided details if the student does not already exist.
 *
 * @param {object} req - Express request object containing student details in the request body
 * @param {object} res - Express response object
 * @returns {object} - JSON response indicating success or failure of the registration process
 */
const studentRegister = async (req, res) => {
  const { name, motherName, age, grade } = req.body
  try {
    let student = await StudentModel.findOne({ name, motherName, age })
    if (!student) {
      await StudentModel.create({ name, motherName, age, grade })
      res.status(201).json({ message: 'Student register successfully' })
    } else {
      res.status(409).json({ message: 'Student already exists' })
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

/**
 * Retrieves all students from the database with their names and grades.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} - JSON response containing the retrieved student names and grades or an error message
 */
const getAllstudent = async (req, res) => {
  try {
    let students = await StudentModel.find({}, { name: 1, grade: 1 })
    res.status(201).json(students)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

module.exports = { studentRegister, getAllstudent }
