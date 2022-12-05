
import prisma from '../../lib/prisma'

// GET /api/users
export default async function handler (req, res) {
  const usersResult = await prisma.users.findFirst({
    where: {
      id: 3
    }
  })
  res.json(usersResult)
}
