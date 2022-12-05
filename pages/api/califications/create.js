import prisma from '../../../lib/prisma'

// POST /api/califications
export default async function handle (req, res) {
  const { studentId, userId, periodId, createdBy } = req.body
  const result = await prisma.califications.create({
    data: {
      studentId,
      userId,
      periodId,
      createdBy
    }
  })
  res.json(result)
}
