import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { resetTargetOrigin } from '@telegram-apps/sdk/dist/dts/bridge/target-origin';

// Функция для преобразования BigInt в строку
const serializeBigInt = (obj: any) => {
	return JSON.parse(
		JSON.stringify(obj, (key, value) =>
			typeof value === 'bigint' ? value.toString() : value
		)
	);
};

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
		// console.log('001 ЗДЕСЬ:', userId);

		if (!userId) {
			return NextResponse.json(
				{ error: 'Missing userId parameter' },
				{ status: 400 }
			);
		}

		const data = await getReferralsByUserId(userId); // Используем функцию getReferralsByUserId
		// console.log('002 ЗДЕСЬ:', data);
		const referrals = data.map((invitation) => invitation.invitee?.username);
		// console.log('003 ЗДЕСЬ:', referrals);
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error processing request:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const { telegramUser, inviterId } = await req.json();

		const { telegramId, ...rest } = telegramUser;

		const existingUser = await prisma.user.findUnique({
			where: { telegramId: BigInt(telegramId) },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: 'User already exists' },
				{ status: 409 }
			);
		}

		const newUser = await prisma.user.create({
			data: {
				telegramId: BigInt(telegramId),
				...rest,
				walletAddress: '', // Initialize with empty wallet address
			},
		});

		// console.log('newUser:', newUser);

		if (!inviterId || !newUser.id) {
			return NextResponse.json(
				{ error: 'InviterId and InviteeId are required' },
				{ status: 400 }
			);
		}

		const newInvitation = await prisma.invitation.create({
			data: {
				inviterId: inviterId,
				inviteeId: newUser.id,
			},
		});

		const newInvitationSerialized = serializeBigInt(newInvitation);

		return NextResponse.json(newInvitationSerialized, { status: 201 });
	} catch (error) {
		console.error('Error creating invitation:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
