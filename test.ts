import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getTelegramId(userId: string): Promise<string | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        telegramId: true,
      },
    });
    return user ? user.telegramId.toString() : null; // Преобразуем BigInt в строку
  } catch (error) {
    console.error('Error fetching telegramId:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Пример вызова функции
(async () => {
  const testUserId = 'cly40arh70004io2ji5n29jlq';
  try {
    const telegramId = await getTelegramId(testUserId);
    console.log('Telegram ID:', telegramId);
  } catch (error) {
    console.error('Error:', error);
  }
})();
