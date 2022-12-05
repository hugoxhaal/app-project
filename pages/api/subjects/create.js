import prisma from '../../../lib/prisma'

// POST /api/subjects
export default async function handle (req, res) {
  const { subjectName, periodId, createdBy } = req.body
  const result = await prisma.subjects.create({
    data: {
      subjectName,
      Periods: { connect: { id: periodId } },
      createdBy
    }
  })
  res.json(result)
}
