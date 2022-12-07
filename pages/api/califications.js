
import prisma from '../../lib/prisma'

// GET /api/califications
export default async function handler (req, res) {
  const usersResult = await prisma.califications.findMany({
    include: {
      Subjects: true,
      Students: true
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
