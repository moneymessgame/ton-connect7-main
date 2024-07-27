import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const invitations = await prisma.invitation.findMany({
      include: {
        inviter: true,
        invitee: true,
      },
    });
    return NextResponse.json(invitations);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { inviterId, inviteeId } = await request.json();

  try {
    // Создаем запись о приглашении
    const newInvitation = await prisma.invitation.create({
      data: {
        inviterId,
        inviteeId,
      },
    });

    // Обновляем связи у пользователей
    await prisma.user.update({
      where: { telegramId: BigInt(inviterId) },
      data: {
        invitationsSent: {
          connect: { id: newInvitation.id },
        },
      },
    });

    await prisma.user.update({
      where: { telegramId: BigInt(inviteeId) },
      data: {
        invitationsReceived: {
          connect: { id: newInvitation.id },
        },
      },
    });

    return NextResponse.json(newInvitation, { status: 201 });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
