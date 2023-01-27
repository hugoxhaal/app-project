import { prisma } from '../../../../lib/prisma'

// POST /api/periods
export default async function handle (req, res) {
  const { studentId } = req.query
  try {
    const result = await prisma.periods.findMany({
      where: {
        Subjects: {
          some: { Califications: {} }
        },
        isActive: true,
        isClosed: false,
        Inscriptions: { some: { studentId: Number(studentId) } }
      },
      include: {
        Subjects: true,
        Inscriptions: true
      }
    })
    return res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
