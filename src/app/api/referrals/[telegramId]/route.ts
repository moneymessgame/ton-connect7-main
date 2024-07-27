// src/app/api/referrals/[telegramId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Params {
  telegramId: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { telegramId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
      include: {
        invitationsSent: {
          include: {
            invitee: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const referrals = user.invitationsSent.map((invitation) => invitation.invitee);

    return NextResponse.json(referrals);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
