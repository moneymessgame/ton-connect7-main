import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeUser } from '@/lib/serializeUser';

// Обработчик PATCH-запросов для обновления кошелька
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const telegramId = params.id;
	const { walletAddress, ...rest } = await req.json();

	console.log(walletAddress, telegramId, rest);

	try {
		const updatedUser = await prisma.user.update({
			where: { telegramId: BigInt(telegramId) },
			data: { walletAddress, ...rest },
		});

		return NextResponse.json(serializeUser(updatedUser), { status: 200 });
	} catch (error) {
		console.error('Error updating user:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}