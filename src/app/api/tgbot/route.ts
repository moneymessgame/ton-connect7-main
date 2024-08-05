import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export interface TelegramMessage {
  message_id: number;
  chat: {
    id: number;
  };
  from: {
    language_code: string;
  };
  text: string;
}

export interface TelegramResponse<T> {
  ok: boolean;
  result: T;
}

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
const allowedLocales = ['en', 'ru'];

export async function POST(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const locale = searchParams.get('locale') || 'en';
	const text = searchParams.get('text') || '';
	const chatId = searchParams.get('chatId') || '';

	if (typeof locale !== 'string' || !allowedLocales.includes(locale)) {
		return NextResponse.json({ error: 'Invalid or missing locale' });
	}	

	try {	
		const messages = await import(`@/locales/${locale}/common.json`);
		const translation = getNestedValue(messages.default, text);
		return NextResponse.json({ translation });
	} catch (error) {
		console.error('Error loading locale messages:', error);
		return NextResponse.json({ error: 'Internal server error' });
	}
}

function getNestedValue(obj: any, path: string) {
	const keys = path.split('.');
	return keys.reduce((acc, key) => acc[key], obj);
}

const sendMessage = async (chatId: string, text: string, buttonText: string) => {
	return fetch(`${TELEGRAM_API}/sendMessage`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: chatId,
			text: text,
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: buttonText,
							callback_data: 'start',
						},
					],
				],
			},
		}),
	});
}

const pinMessage = async (chatId: string, messageId: string) => {
	return fetch(`${TELEGRAM_API}/pinChatMessage`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: chatId,
			message_id: messageId,
		}),
	});
}