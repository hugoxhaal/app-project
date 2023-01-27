
import { prisma } from '../../lib/prisma'

// GET /api/students
export default async function handler (req, res) {
  const usersResult = await prisma.students.findMany({
    include: {
      Inscriptions: true
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
