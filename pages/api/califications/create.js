import { prisma } from '../../../lib/prisma'

// POST /api/califications
export default async function handle (req, res) {
  const { studentId, subjects, userId, createdBy } = req.body

  const createCalifications = subjects.map((subject) => prisma.califications.create({
    data: {
      calification: Number(subject.calification),
      Subjects: { connect: { id: Number(subject.subjectId) } },
      Students: { connect: { id: Number(studentId) } },
      Users: { connect: { id: Number(userId) } },
      createdBy
    }
  }))

  await Promise.all(createCalifications)

  // const result = await prisma.califications.create({
  //   data: {
  //     calification,
  //     studentId,
  //     userId: 3,
  //     createdBy: 'admin'
  //   }
  // })
  res.json({ status: 'OK' })
}
