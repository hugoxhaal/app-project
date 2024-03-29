
import { prisma } from '../../lib/prisma'

// GET /api/inscriptions
export default async function handler (req, res) {
  const usersResult = await prisma.inscriptions.findMany({
    where: {
      Students: { isActive: true }
    },
    include: {
      Periods: true,
      Students: true
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
