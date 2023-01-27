import { prisma } from '../../../lib/prisma'

export default async function handle (req, res) {
  const { studentId } = req.query

  try {
    const result = await prisma.inscriptions.delete({
      where: {
        periodId_studentId: { studentId: Number(studentId) }
      }
    })
    res.json(result)
  } catch (err) {
    res.status(422).json(err)
  }
}
