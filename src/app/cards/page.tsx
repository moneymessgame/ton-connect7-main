import prisma from '@/lib/prisma';
import RoleCards from '@/components/mafstat/role-cards'

async function getRoles() {
  const roles = await prisma.role.findMany({
    include: {
      player: true,
    },
  })
  return roles
}

export default async function RolePage() {
  const roles = await getRoles()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Roles</h1>
      <RoleCards roles={roles} />
    </div>
  )
}