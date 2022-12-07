
import prisma from '../../lib/prisma'

// GET /api/students
export default async function handler (req, res) {
  const usersResult = await prisma.students.findMany({
    include: {
      Inscriptions: {
        select: { Periods: { select: { id: true, periodName: true, Subjects: true } } }
      }
    },
    where: {
      Inscriptions: { some: {} }
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
