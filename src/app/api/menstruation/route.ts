import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Change = {
	date: string; // Use string because dates are usually sent as strings in JSON
	action: 'add' | 'delete';
};

// Обработчик GET-запросов
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get('userId');
	const months = searchParams.get('months');

	if (!userId || !months) {
		return NextResponse.json(
			{ error: 'UserId and months are required' },
			{ status: 400 }
		);
	}

	try {
		const monthsAgo = new Date();
		monthsAgo.setMonth(monthsAgo.getMonth() - parseInt(months as string));

		const menstruations = await prisma.menstruation.findMany({
			where: {
				userId: userId as string,
				date: {
					gte: monthsAgo,
				},
			},
			orderBy: {
				date: 'asc',
			},
		});

		return NextResponse.json(menstruations, { status: 200 });
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
