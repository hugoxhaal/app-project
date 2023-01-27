import { prisma } from '../../../lib/prisma'

// POST /api/subjects
export default async function handle (req, res) {
  const { subjectName, periodId, createdBy } = req.body
  try {
    const result = await prisma.subjects.create({
      data: {
        subjectName,
        Periods: { connect: { id: Number(periodId) } },
        createdBy
      }
    })
    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
