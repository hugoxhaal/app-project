
import prisma from '../../lib/prisma'

// GET /api/students
export default async function handler (req, res) {
  const usersResult = await prisma.students.findMany({
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
