import { NextRequest, NextResponse } from 'next/server';

const allowedLocales = ['en', 'ru'];

function getNestedValue(obj: any, keyPath: string): any {
	return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const locale = searchParams.get('locale') || 'en';
	const key = searchParams.get('key') || 'telegram.start_message';

	if (typeof locale !== 'string' || !allowedLocales.includes(locale)) {
		return NextResponse.json({ error: 'Invalid or missing locale' });
	}	

	try {
		const messages = await import(`@/locales/${locale}/common.json`);
		const translation = getNestedValue(messages.default, key);
		return NextResponse.json({ translation });
	} catch (error) {
		console.error('Error loading locale messages:', error);
		return NextResponse.json({ error: 'Internal server error' });
	}
}

