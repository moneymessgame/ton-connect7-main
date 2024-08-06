import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

import { updateBalance } from '@/lib/balance';
import challenges from '@/utils/challenges';
import { UserChallenge } from '@prisma/client';
import { isUserSubscribed } from '@/utils/isSubscribed';

export async function POST (req: NextRequest) {
	const { userId, challengeId, telegramId } = await req.json();

	try {
		const challenge = challenges.find((ch) => ch.id === challengeId);

		if (!challenge) {
			return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });
		}

		const userChallenge = await prisma.userChallenge.findUnique({
			where: { userId_challengeId: { userId, challengeId } },
		});

		if (userChallenge && userChallenge.completed) {
			return NextResponse.json({ error: 'Challenge already completed' }, { status: 400 });
		}

		const isSubscribed = await isUserSubscribed(telegramId, challenge.chatId);

		console.log('Юзер подписан: ', isSubscribed);

		if (!isSubscribed) {
			return NextResponse.json({ error: 'User is not subscribed to the channel' }, { status: 400 });
		}

		if (!userChallenge) {
			await prisma.userChallenge.create({
				data: {
					userId,
					challengeId,
					completed: false,
				},
			});
		} else {
			await prisma.userChallenge.update({
				where: { userId_challengeId: { userId, challengeId } },
				data: { completed: true },
			});
		}

		await updateBalance(userId, challenge.reward, 'Challenge completed and reward granted');
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Error completing challenge:', error);
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
	}
}

export async function GET (req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get('userId');

	if (!userId) {
		return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
	}

	try {
		const challenges = await prisma.userChallenge.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});	

		const completedChallengeIds = new Set(
			challenges
				.filter((uc: UserChallenge) => uc.completed)
				.map((uc: UserChallenge) => uc.challengeId)
		);

		const allChallenges = challenges.map((challenge) => ({
			...challenge,
			isCompleted: completedChallengeIds.has(challenge.challengeId),
		}));		

		return NextResponse.json(allChallenges, { status: 200 });
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}