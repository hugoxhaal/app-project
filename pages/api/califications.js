
import prisma from '../../lib/prisma'

// GET /api/califications
export default async function handler (req, res) {
  const usersResult = await prisma.califications.findMany({
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
