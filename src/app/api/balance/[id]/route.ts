import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeUser } from '@/lib/serializeUser';
import { updateBalance } from '@/lib/balance';

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;

	if (!id) {
		return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: String(id) },
			select: { tokenBalance: true },
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json({ tokenBalance: user.tokenBalance });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	const { amount, reason } = await req.json();
	const updateReason = reason || 'Gift From MoneyMess Team';

	if (!id) {
		return NextResponse.json({ error: 'UserId is required' }, { status: 419 });
	}

	try {
		const user = await updateBalance(String(id), amount, updateReason);
		return NextResponse.json(serializeUser(user));
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 519 }
		);
	}
}
