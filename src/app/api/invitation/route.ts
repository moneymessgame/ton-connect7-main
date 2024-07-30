// // src/app/api/invitation/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     console.log('1 ЗДЕСЬ:', searchParams);
//     const inviterId = searchParams.get('inviterId');
//     const inviteeId = searchParams.get('inviteeId');
//     console.log('2 ЗДЕСЬ: inviterId:', inviterId, 'inviteeId:', inviteeId);

//     if (!inviterId && !inviteeId) {
//       return NextResponse.json({ error: 'Either inviterId or inviteeId is required' }, { status: 400 });
//     }

//     const where: any = {};
//     if (inviterId) where.inviterId = inviterId;
//     if (inviteeId) where.inviteeId = inviteeId;

//     const invitations = await prisma.invitation.findMany({
//       where,
//       include: {
//         inviter: true,
//         invitee: true,
//       },
//     });

//     const invitationsSerialized = invitations.map(invitation => 
//       JSON.parse(JSON.stringify(invitation, (key, value) =>
//         typeof value === 'bigint' ? value.toString() : value
//       ))
//     );

//     console.log('3 ЗДЕСЬ:', invitationsSerialized);

//     return NextResponse.json(invitationsSerialized);
//   } catch (error) {
//     console.error('4 Error fetching invitations:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

///////////////////

// // src/app/api/invitation/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     // console.log('1 ЗДЕСЬ:', searchParams);
//     const userId = searchParams.get('id');
//     console.log('2 ЗДЕСЬ:', userId);

//     if (!userId) {
//       return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
//     }

//     const userWithInvitations = await prisma.user.findUnique({
//       where: { id: userId },
//       include: {
//         invitationsSent: true,
//         invitationsReceived: true,
//       },
//     });
//     // console.log('3 ЗДЕСЬ:', userWithInvitations);

//     if (!userWithInvitations) {
//       console.log('4 Юзер не найден', userWithInvitations);
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Преобразование данных с BigInt в строку
//     const userWithInvitationsSerialized = JSON.parse(JSON.stringify(userWithInvitations, (key, value) =>
//       typeof value === 'bigint' ? value.toString() : value
//     ));
// 		console.log('5 ЗДЕСЬ:', userWithInvitationsSerialized);
//     return NextResponse.json(userWithInvitationsSerialized);

//   } catch (error) {
//     console.error('6 Error fetching user with invitations:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

	/////// FTON ////////
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'GET') {
//     try {
//       const invitations = await prisma.invitation.findMany({
//         include: {
//           inviter: true,
//           invitee: true,
//         },
//       });
//       res.status(200).json(invitations);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else if (req.method === 'POST') {
//     const { inviterId, inviteeId } = req.body;
//     try {
//       const newInvitation = await prisma.invitation.create({
//         data: {
//           inviterId,
//           inviteeId,
//         },
//       });
//       res.status(201).json(newInvitation);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// };

// export default handler;

// src/app/api/invitation/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Функция для преобразования BigInt в строку
const serializeBigInt = (obj: any) => {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');
    console.log('1 ЗДЕСЬ:', userId);

    if (!userId) {
      return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
    }

    const invitations = await prisma.invitation.findMany({
      where: {
        OR: [
          { inviterId: userId },
          { inviteeId: userId }
        ]
      },
      include: {
        inviter: true,
        invitee: true
      }
    });
		console.log('2 ЗДЕСЬ:', invitations);

    if (!invitations.length) {
      return NextResponse.json({ message: 'No invitations found for this user' });
    }

    const invitationsSerialized = serializeBigInt(invitations);
    console.log('3 ЗДЕСЬ:', invitationsSerialized);
    return NextResponse.json(invitationsSerialized);

  } catch (error) {
    console.error('4 Error fetching invitations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
		console.log('5 ЗДЕСЬ:', data);
    const { inviterId, inviteeId } = data;
		console.log('6 ЗДЕСЬ:', inviterId, inviteeId);

    if (!inviterId || !inviteeId) {
      return NextResponse.json({ error: 'InviterId and InviteeId are required' }, { status: 400 });
    }

    const newInvitation = await prisma.invitation.create({
      data: {
        inviterId,
        inviteeId
      }
    });
		console.log('7 ЗДЕСЬ:', newInvitation);

    const newInvitationSerialized = serializeBigInt(newInvitation);
		console.log('8 ЗДЕСЬ:', newInvitationSerialized);
    return NextResponse.json(newInvitationSerialized, { status: 201 });

  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
