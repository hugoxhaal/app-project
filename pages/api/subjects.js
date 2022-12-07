
import prisma from '../../lib/prisma'

// GET /api/subjects
export default async function handler (req, res) {
  const usersResult = await prisma.subjects.findMany({
    include: {
      Periods: true
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
