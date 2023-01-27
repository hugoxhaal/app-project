import { prisma } from '../../../lib/prisma'

export default async function handle (req, res) {
  const { subjects } = req.body

  try {
    const deleteCalifications = subjects.map((subject) => prisma.califications.delete({
      where: {
        id: subject.id
      }
    }))

    await Promise.all(deleteCalifications)

    res.json(deleteCalifications)
  } catch (err) {
    res.status(422).json(err)
  }
}
