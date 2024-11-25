'use client';

import { useEffect, useState, ReactNode } from 'react';
import { IntlProvider } from 'next-intl';
import axios from 'axios';

import Loader from '@/components/shared/common/Loader';
import { setupMockTelegramEnv } from '@/lib/mockEnv';

const allowedLocales = ['en', 'ru'];

function LangProvider({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [isHashValid, setIsHashValid] = useState(false);
	const [locale, setLocale] = useState('en'); // Default to 'en' if not set
	const [messages, setMessages] = useState({});
	const [loading, setLoading] = useState(true);
	const [errorCode, setErrorCode] = useState('');

	useEffect(() => {
		if (
			process.env.NODE_ENV === 'development' &&
			typeof window !== 'undefined'
		) {
			setupMockTelegramEnv();
		}

		if (process.env.NODE_ENV === 'production') {
			// Telegram hook for production
			axios
				.post('/api/hash', { hash: window.Telegram.WebApp.initData })
				.then((response) => setIsHashValid(response.status === 200))
				.catch(() => setIsHashValid(false));
		} else {
			// For development, set hash as valid to debug locally
			setIsHashValid(true);
		}

		// Extract language_code from Telegram WebApp and set locale
		try {
			const params = new URLSearchParams(window.Telegram.WebApp.initData);
			const userParam = params.get('user');

			if (userParam) {
				const userObj = JSON.parse(decodeURIComponent(userParam));
				const userLocale = userObj.language_code || 'en';
				setLocale(allowedLocales.includes(userLocale) ? userLocale : 'en');
			} else {
				setLocale('en');
				setErrorCode(`No userParam in params: "${params}"`);
			}
		} catch (error) {
			console.error('Error parsing initData:', error);
			setErrorCode(`${error}`);
			setLocale('en');
		}
	}, []);

	useEffect(() => {
		// Fetch the appropriate messages based on the determined locale
		import(`@/locales/${locale}/common.json`)

			.then((msgs) => {
				setMessages(msgs.default);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error loading locale messages:', error);
				setLoading(false);
			});
	}, [locale]);

	if (!isHashValid) {
		return null;
	}

	if (loading) {
		return <Loader />;
	}

	return (
		<IntlProvider messages={messages} locale={locale}>
			{children}
		</IntlProvider>
	);
}

export default LangProvider;
