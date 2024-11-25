import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function CharacterPage({ params }: { params: { url: string } }) {
  const character = await prisma.character.findFirst({
    where: { url: params.url },
    include: { rarity: true }
  })

  if (!character) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className=" shadow-xl rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <Image 
            src={`/characters/middle/${character.src}`}
            alt={character.nickname || ''} 
            width={200} 
            height={200} 
            className="rounded-full mx-auto mb-4 bg-black/50"
          />
          <h1 className="text-2xl font-bold text-center mb-2">
            {character.nickname || `${character.firstName} ${character.lastName}`}
          </h1>
          <p className="text-gray-600 text-center mb-4">Number: {character.number}</p>
          <p className="text-gray-600 text-center mb-4">Rarity: {character.rarity.name}</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Character Details</h2>
            <pre className=" p-4 rounded overflow-x-auto">
              {JSON.stringify(character.value, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

