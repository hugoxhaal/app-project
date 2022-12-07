
import prisma from '../../lib/prisma'

// GET /api/periods
export default async function handler (req, res) {
  const result = await prisma.periods.findMany({
    orderBy: {
      id: 'desc'
    }
  })
  res.json(result)
}
