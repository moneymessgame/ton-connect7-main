import { NextResponse, NextRequest } from 'next/server';
import { webcrypto } from 'crypto';

type Data = { ok: boolean } | { error: string };

export async function POST(req: NextRequest) {
	// must be public
	const data = await req.json();
	const isValid = await isHashValid(data, process.env.BOT_TOKEN);

	if (isValid) {
		return NextResponse.json({ ok: true });
	}
	return NextResponse.json({ error: 'Invalid hash' });
}

async function isHashValid(data: Record<string, string>, botToken: string) {
	const encoder = new TextEncoder();

	const checkString = Object.keys(data)
		.filter((key) => key !== 'hash')
		.map((key) => `${key}=${data[key]}`)
		.sort()
		.join('\n');

	const secretKey = await webcrypto.subtle.importKey(
		'raw',
		encoder.encode('WebAppData'),
		{ name: 'HMAC', hash: 'SHA-256' },
		true,
		['sign']
	);

	const secret = await webcrypto.subtle.sign('HMAC', secretKey, encoder.encode(botToken));

	const signatureKey = await webcrypto.subtle.importKey(
		'raw',
		secret,
		{ name: 'HMAC', hash: 'SHA-256' },
		true,
		['sign']
	);

	const signature = await webcrypto.subtle.sign('HMAC', signatureKey, encoder.encode(checkString));

	const hex = Buffer.from(signature).toString('hex');

	return hex === data.hash;
}

