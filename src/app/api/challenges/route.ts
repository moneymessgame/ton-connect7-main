import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

import challenges from '@/utils/challenges';
import { UserChallenge } from '@prisma/client';


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

// Обработчик GET-запросов
export async function GET (req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
  
    if (!userId) {
        return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }
  
    try {
        const challenges = await getUserChallenges(String(userId));
        return NextResponse.json(challenges, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}