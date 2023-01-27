import { prisma } from '../../../lib/prisma'

// POST /api/periods
export default async function handle (req, res) {
  const { id, isActive } = req.body
  try {
    const result = await prisma.students.update({
      where: {
        id
      },
      data: {
        isActive
      }
    })

    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
