import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request) {
  const character = await request.json()

  try {
    const updatedCharacter = await prisma.character.update({
      where: { id: character.id },
      data: {
        number: character.number,
        firstName: character.firstName,
        lastName: character.lastName,
        nickname: character.nickname,
        src: character.src,
        url: character.url,
        rarityId: character.rarityId,
        value: character.value,
      },
      include: { rarity: true },
    })

    return NextResponse.json(updatedCharacter)
  } catch (error) {
    console.error('Error updating character:', error)
    return NextResponse.json({ error: 'Failed to update character' }, { status: 500 })
  }
}

