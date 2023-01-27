import { prisma } from '../../lib/prisma'

// GET /api/califications
export default async function handler (req, res) {
  const usersResult = await prisma.students.findMany({
    where: { isActive: true },
    include: {
      Califications: { select: { id: true, calification: true, Subjects: true } },
      Inscriptions: { select: { Periods: true } }
    },
    orderBy: {
      id: 'desc'
    }
  })
  res.json(usersResult)
}
