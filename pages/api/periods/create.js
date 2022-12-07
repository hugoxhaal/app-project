import prisma from '../../../lib/prisma'

// POST /api/periods
export default async function handle (req, res) {
  const { periodName, createdBy } = req.body
  try {
    const result = await prisma.periods.create({
      data: {
        periodName,
        createdBy
      }
    })

    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
