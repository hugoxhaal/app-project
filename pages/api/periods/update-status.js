import { prisma } from '../../../lib/prisma'

// POST /api/periods
export default async function handle (req, res) {
  const { id, isActive, isClosed } = req.body
  try {
    const result = await prisma.periods.update({
      where: {
        id
      },
      data: {
        isActive,
        isClosed
      }
    })

    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
