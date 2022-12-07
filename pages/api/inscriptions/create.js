import prisma from '../../../lib/prisma'

// POST /api/inscriptions
export default async function handle (req, res) {
  const { studentId, userId, periodId, createdBy } = req.body
  try {
    const result = await prisma.inscriptions.create({
      data: {
        studentId: Number(studentId),
        userId: Number(userId),
        periodId: Number(periodId),
        createdBy
      }
    })
    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
