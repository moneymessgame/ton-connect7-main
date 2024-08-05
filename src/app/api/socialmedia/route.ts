import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const socialMedia = await prisma.socialMedia.findMany();
		return NextResponse.json(socialMedia, { status: 200 });
	} catch (error) {	
		console.error('Error fetching social media:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const { platform, handle, userId } = await req.json();
		const socialMedia = await prisma.socialMedia.create({
			data: {
				platform,
				handle,
				userId,
			},
		});
		return NextResponse.json(socialMedia, { status: 201 });
	} catch (error) {
		console.error('Error creating social media:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}