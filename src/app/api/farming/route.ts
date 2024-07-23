import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// Обработчик GET-запросов
export async function GET (req: NextRequest) {

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
            return NextResponse.json({ error: 'No farming session found for this user' }, { status: 400 });
        }

        const now = new Date();

        if (now > farmingSession.timeFinish && !farmingSession.prizeReceived) {
            await prisma.farmingSession.update({
                where: { id: farmingSession.id },
                data: { prizeReceived: true },
            });
    
            const { NEXT_PUBLIC_BASE_URL, AUTH_KEY } = process.env;
            const absoluteUrl = `${NEXT_PUBLIC_BASE_URL}/api/user/${userId}/balance`;
    
            await fetch(absoluteUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-key': AUTH_KEY || '',
                },
                body: JSON.stringify({ amount: farmingSession.totalReward, reason: 'Farming' }),
            });
          }
  
        return NextResponse.json(farmingSession, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  