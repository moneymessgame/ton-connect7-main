// // src/app/api/referrals/[telegramId]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// interface Params {
//   telegramId: string;
// }

// export async function GET(request: NextRequest, { params }: { params: Params }) {
//   const { telegramId } = params;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { telegramId: BigInt(telegramId) },
//       include: {
//         invitationsSent: {
//           include: {
//             invitee: true,
//           },
//         },
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     const referrals = user.invitationsSent.map((invitation) => invitation.invitee);

//     return NextResponse.json(referrals);
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

/////// МОЙ ВАРИАНТ /////////
// src/app/api/referrals/route.ts

// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   try {
//     // Извлекаем параметры из URL
//     const { searchParams } = new URL(request.url);
//     const telegramId = searchParams.get('telegramId');
// 		console.log('001 ЗДЕСЬ:', telegramId);

//     // Проверяем, был ли передан telegramId
//     if (!telegramId) {
//       return NextResponse.json(
//         { error: 'Missing telegramId parameter' },
//         { status: 400 }
//       );
//     }

//     // Логика для обработки запроса с telegramId
//     const data = { message: `Received telegramId: ${telegramId}` };
// 		console.log('002 ЗДЕСЬ:', data);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error processing request:', error);
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function getReferralsByUserId(userId: string) {
  try {
    const userWithReferrals = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        invitationsSent: {
          include: {
            invitee: true,
          },
        },
      },
    });

    if (!userWithReferrals) return [];

    return userWithReferrals.invitationsSent.map((invitation) => ({
      ...invitation,
      invitee: invitation.invitee
        ? {
            ...invitation.invitee,
            telegramId: invitation.invitee.telegramId.toString(),
          }
        : null,
    }));
  } catch (error) {
    console.error('Error fetching referrals:', error);
    throw new Error('Could not fetch referrals');
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId'); // Используем userId вместо telegramId
    console.log('001 ЗДЕСЬ:', userId);

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const data = await getReferralsByUserId(userId); // Используем функцию getReferralsByUserId
    console.log('002 ЗДЕСЬ:', data);
    const referrals = data.map((invitation) => invitation.invitee?.username);
    console.log('003 ЗДЕСЬ:', referrals);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

