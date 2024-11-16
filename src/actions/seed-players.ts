'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedPlayers(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) {
    return { success: false, message: 'No file uploaded' }
  }

  const fileContent = await file.text()
  let players

  try {
    players = JSON.parse(fileContent)
  } catch (error) {
    return { success: false, message: 'Invalid JSON file' }
  }

  let createdCount = 0
  let skippedCount = 0

  for (const player of players) {
    try {
      await prisma.player.create({
        data: {
          nickname: player.nickname,
          roles: player.roles,
          createdAt: new Date(player.created.$date),
          updatedAt: new Date(player.updatedAt.$date),
          userId: player._id.$oid, // Assuming this is the correct field to use
          user: {
            connectOrCreate: {
              where: { id: player._id.$oid },
              create: {
                firstName: player.firstName,
                lastName: player.lastName,
                telegramId: player._id.$oid,
                // Add other necessary User fields here
              }
            }
          },
          // Add other fields as necessary
        }
      })
      createdCount++
    } catch (error) {
      console.error(`Error creating player ${player.nickname}:`, error)
      skippedCount++
    }
  }

  return { 
    success: true, 
    message: `Seeding complete. Created ${createdCount} players. Skipped ${skippedCount} players.` 
  }
}