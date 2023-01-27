
import { prisma } from '../../lib/prisma'

// GET /api/students
export default async function handler (req, res) {
  const usersResult = await prisma.students.findMany({
    include: {
      Inscriptions: {
        select: { id: true, periodId: true, Periods: { select: { id: true, period: true, periodYear: true, Subjects: true } } }
      }
    },
    where: {
      isActive: true,
      Inscriptions: { some: {} }
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
