
import { prisma } from '../../lib/prisma'

// GET /api/students-by-inscription
export default async function handler (req, res) {
  const result = await prisma.inscriptions.findMany({
    include: {
      Periods: true,
      Students: { id: true, studentName: true, cedula: true, Califications: true }
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(result)
}
