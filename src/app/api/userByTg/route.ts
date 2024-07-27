import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeUser } from '@/lib/serializeUser';
import withMiddleware from '@/utils/withMiddleware';

// Обработчик GET-запросов
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const telegramId = searchParams.get('telegramId');

  if (!telegramId) {
    return NextResponse.json({ error: 'telegramId is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
      include: {
        menstruations: true,
        invitationsSent: true,
        invitationsReceived: true,
        socialMedia: true,
      },
    });

    if (user) {
      return NextResponse.json(serializeUser(user), { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Обработчик POST-запросов
export async function POST(req: NextRequest) {
  const { telegramId, inviterTelegramId, ...rest } = await req.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'A user with this telegramId already exists' }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        telegramId: BigInt(telegramId),
        ...rest,
        walletAddress: '', // Initialize with empty wallet address
      },
    });

    // Если указан реферальный ID, добавляем запись в таблицу Invitation
    if (inviterTelegramId) {
      const inviter = await prisma.user.findUnique({
        where: { telegramId: BigInt(inviterTelegramId) },
      });

      if (inviter) {
        await prisma.invitation.create({
          data: {
            inviterId: inviter.id,
            inviteeId: newUser.id,
          },
        });
      }
    }

    return NextResponse.json(serializeUser(newUser), { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A user with this telegramId already exists' }, { status: 409 });
    }
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Обработчик PATCH-запросов
export async function PATCH(req: NextRequest) {
  const { walletAddress, telegramId, ...rest } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { telegramId: BigInt(telegramId) },
      data: { walletAddress, ...rest },
    });

    return NextResponse.json(serializeUser(updatedUser), { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
