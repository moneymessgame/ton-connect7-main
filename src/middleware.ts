import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

export default function middleware(req: NextRequest, res: NextResponse) {
	const authKey = req.headers.get('x-auth-key'); 
	const expectedAuthKey = process.env.AUTH_KEY;
	const origin = req.headers.get('origin') || req.headers.get('referer') || ''; 

	if (req.url?.startsWith('/api/tgbot') || req.url?.startsWith('/api/hash')) {
		// Allow /api/tgbot, /api/validate-hash to be accessed in all environments
		return NextResponse.next();
	} else if (
		allowedOrigins.some((allowedOrigin) => origin.startsWith(allowedOrigin))
	) {
		// Allow access if the request comes from an allowed origin
		return NextResponse.next();
	} else if (process.env.NODE_ENV === 'development') {
		// Allow all other API requests only in local development
		return NextResponse.next();
	} else if (
		authKey !== undefined &&
		expectedAuthKey !== undefined &&
		authKey === expectedAuthKey
	) {
		// Allow access if the correct auth key is provided
		return NextResponse.next();
	} else {
		// Restrict access in production if auth key is missing or incorrect
		return new Response('Forbidden: Invalid API key or origin', {
			status: 403,
		});
	}
}