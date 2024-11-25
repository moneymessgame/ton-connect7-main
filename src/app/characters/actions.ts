'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createCharacter(data: any) {
  try {
    const newCharacter = await prisma.character.create({
      data: {
        ...data,
        value: JSON.parse(data.value)
      },
      include: { rarity: true }
    })
    return { success: true, character: newCharacter }
  } catch (error) {
    console.error('Error creating character:', error)
    return { success: false, error: 'Failed to create character' }
  }
}

export async function updateCharacter(data: any) {
  try {
    const updatedCharacter = await prisma.character.update({
      where: { id: data.id },
      data: {
        ...data,
        value: JSON.parse(data.value)
      },
      include: { rarity: true }
    })
    return { success: true, character: updatedCharacter }
  } catch (error) {
    console.error('Error updating character:', error)
    return { success: false, error: 'Failed to update character' }
  }
}

export async function deleteCharacter(id: string) {
  try {
    await prisma.character.delete({
      where: { id }
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting character:', error)
    return { success: false, error: 'Failed to delete character' }
  }
}

