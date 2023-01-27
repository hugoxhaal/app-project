
import { prisma } from '../../lib/prisma'

// GET /api/login
export default async function handler (req, res) {
  const usersResult = await prisma.users.findFirst({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
  res.json(usersResult)
}
