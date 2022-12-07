import prisma from '../../../lib/prisma'

// POST /api/students
export default async function handle (req, res) {
  const { studentName, cedula, createdBy } = req.body
  try {
    const result = await prisma.students.create({
      data: {
        studentName,
        cedula,
        createdBy
      }
    })
    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
