import { PrismaClient } from '@prisma/client'
import CharacterTable from './CharacterTable'

const prisma = new PrismaClient()

export default async function CharactersPage() {
  const characters = await prisma.character.findMany({
    include: { rarity: true }
  })
  const rarities = await prisma.rarity.findMany()

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-5">Character Management</h1>
      <CharacterTable initialCharacters={characters} rarities={rarities} />
    </div>
  )
}

