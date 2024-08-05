import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// Обработчик GET-запросов
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get('userId');

	if (!userId) {
		return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
	}

	try {
		const farmingSession = await prisma.farmingSession.findFirst({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});

		if (!farmingSession) {
			return NextResponse.json(
				{ error: 'No farming session found for this user' },
				{ status: 400 }
			);
		}

		const now = new Date();

		if (now > farmingSession.timeFinish && !farmingSession.prizeReceived) {
			await prisma.farmingSession.update({
				where: { id: farmingSession.id },
				data: { prizeReceived: true },
			});

			const { NEXT_PUBLIC_BASE_URL, AUTH_KEY } = process.env;
			const absoluteUrl = `${NEXT_PUBLIC_BASE_URL}/api/balance/${userId}`;

			await fetch(absoluteUrl, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-key': AUTH_KEY || '',
				},
				body: JSON.stringify({
					amount: farmingSession.totalReward,
					reason: 'Farming',
				}),
			});
		}

		return NextResponse.json(farmingSession, { status: 200 });
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

// Обработчик POST-запросов
export async function POST(req: NextRequest) {
	const { status, userId } = await req.json();

	console.log(userId);

	if (!userId) {
		return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
	}

	try {
		// Check if there is an existing session with prizeReceived = false
		const existingSession = await prisma.farmingSession.findFirst({
			where: { userId, prizeReceived: false },
		});

		if (existingSession) {
			return NextResponse.json(
				{ error: 'An existing farming session is already in progress' },
				{ status: 400 }
			);
		}

		const timeStart = new Date();
		const timeFinish = new Date(timeStart.getTime() + 8 * 60 * 60 * 1000); // 8 hours from start

		const farmingSession = await prisma.farmingSession.create({
			data: {
				userId,
				timeFinish,
				totalReward: 7200,
				prizeReceived: false,
			},
		});

		return NextResponse.json(farmingSession, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
