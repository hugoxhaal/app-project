import { prisma } from '../../../lib/prisma'

// POST /api/periods
export default async function handle (req, res) {
  const { id } = req.body
  try {
    const result = await prisma.subjects.delete({
      where: {
        id
      }
    })

    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
