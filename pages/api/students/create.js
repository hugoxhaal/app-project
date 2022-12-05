import prisma from '../../../lib/prisma'

// POST /api/students
export default async function handle (req, res) {
  const { name, cedula, periodId, createdBy } = req.body
  const result = await prisma.students.create({
    data: {
      name,
      cedula,
      Periods: { connect: { id: periodId } },
      createdBy
    }
  })
  res.json(result)
}
