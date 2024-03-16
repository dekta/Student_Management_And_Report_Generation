const { MarksModel } = require('../models/marks.model')
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

const getStudentMarksReport = async (req, res) => {
  try {
    const studentId = req.params.studentId
    const student = await StudentModel.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    const marksReport = await MarksModel.aggregate([
      {
        $match: { studentId: studentId }
      },
      {
        $project: {
          _id: 0,
          studentId: 1,
          grade: 1,
          subjects: 1
        }
      },
      {
        $unwind: '$subjects'
      },
      {
        $group: {
          _id: '$studentId',
          totalMarks: { $sum: '$subjects.score' },
          subjects: { $push: '$subjects' }
        }
      },
      {
        $project: {
          _id: 0,
          grade: 1,
          totalMarks: 1,
          subjects: 1,
          percentage: { $divide: ['$totalMarks', { $size: '$subjects' }] }
        }
      }
    ])

    res.status(200).json({ student: student, marksReport: marksReport })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

const getStudentsWithPassPercentageOver50 = async (req, res) => {
  try {
    const studentsWithPassPercentageOver50 = await MarksModel.aggregate([
      {
        $unwind: '$subjects'
      },
      {
        $group: {
          _id: '$studentId',
          totalMarks: { $sum: '$subjects.score' },
          totalPossibleMarks: { $sum: 100 }, // Assuming each subject has a maximum score of 100
          passSubjectsCount: {
            $sum: {
              $cond: [{ $gte: ['$subjects.score', 50] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          passSubjectsCount: 1,
          totalMarks: 1,
          passPercentage: {
            $multiply: [
              { $divide: ['$totalMarks', '$totalPossibleMarks'] },
              100
            ]
          }
        }
      },
      {
        $match: {
          passPercentage: { $gte: 50 }
        }
      }
    ])

    const students = await Promise.all(
      studentsWithPassPercentageOver50.map(async student => {
        const studentDetails = await StudentModel.findById(student._id)
        return {
          ...studentDetails.toJSON(),
          passPercentage: student.passPercentage
        }
      })
    )

    res.status(200).json(students)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong.', error: err.message })
  }
}

const deleteStudentWithData = async (req, res) => {
  const studentId = req.params.studentId
  try {
    const deletedStudent = await StudentModel.findByIdAndDelete(studentId)
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' })
    }
    const deletedMarks = await MarksModel.deleteMany({ studentId })
    res
      .status(200)
      .json({ message: 'Student and associated marks deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  studentRegister,
  getAllstudent,
  getStudentMarksReport,
  getStudentsWithPassPercentageOver50,
  deleteStudentWithData
}
