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


// src/app/api/referrals/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Извлекаем параметры из URL
    const { searchParams } = new URL(request.url);
    const telegramId = searchParams.get('telegramId');

    // Проверяем, был ли передан telegramId
    if (!telegramId) {
      return NextResponse.json(
        { error: 'Missing telegramId parameter' },
        { status: 400 }
      );
    }

    // Логика для обработки запроса с telegramId
    const data = { message: `Received telegramId: ${telegramId}` };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
