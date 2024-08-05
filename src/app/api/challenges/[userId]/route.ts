import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UserChallenge } from '@prisma/client';
import challenges from '@/utils/challenges';

async function getUserChallenges(userId: string) {
  const userChallenges = await prisma.userChallenge.findMany({
    where: { userId },
  });

  const completedChallengeIds = new Set(
    userChallenges
      .filter((uc: UserChallenge) => uc.completed)
      .map((uc: UserChallenge) => uc.challengeId)
  );

  const allChallenges = challenges.map((challenge) => ({
    ...challenge,
    isCompleted: completedChallengeIds.has(challenge.id),
  }));

  return { challenges: allChallenges };
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get('userId');

	if (!userId) {
		return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
	}

	try {
		const challenges = await getUserChallenges(userId);
		return NextResponse.json(challenges, { status: 200 });
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

// api/user/clzek2zvu0000q4vzekn1r2sj - динамический путь [userId]
// api/user?userId=clzek2zvu0000q4vzekn1r2sj - статический путь
