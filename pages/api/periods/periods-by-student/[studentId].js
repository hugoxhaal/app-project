import { prisma } from '../../../../lib/prisma'

// POST /api/periods
export default async function handle (req, res) {
  const { studentId } = req.query
  try {
    const hasInscriptions = await prisma.inscriptions.count({
      where: { studentId: Number(studentId), Periods: { isClosed: false, OR: { isActive: true } } }
    })

    console.log(hasInscriptions)

    if (!hasInscriptions) {
      const result = await prisma.periods.findMany({
        where: {
          Inscriptions: {
            none: { studentId: Number(studentId) }
          }
        },
        include: {
          Inscriptions: true
        }
      })
      return res.json(result)
    }

    res.json([])
  } catch (err) {
    res.status(422).json(err)
  }
}
