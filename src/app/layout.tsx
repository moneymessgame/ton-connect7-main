import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
// import { GoogleAnalytics } from '@next/third-parties/google';

import styles from './layout.module.scss';
import '@/styles/globals.scss';

import LangProvider from '@/components/providers/lang-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import TmaProvider from '@/components/providers/tma-provider';
import TonProvider from '@/components/providers/ton-provider';

import { ModalProvider } from '@/contexts/ModalContext';
import { UserProvider } from '@/contexts/UserContext';

import NextTopLoader from 'nextjs-toploader';
import Loader from '@/components/blocks/Loader';

import Navigation from '@/components/blocks/Navigation';

import { Viewport } from 'next';
import { NoMobile } from '@/components/blocks/NoMobile';

import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	themeColor: 'rgb(5, 8, 17)',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: 'Telegram mini app',
	description: 'Best app in the world',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<Script
					src="https://telegram.org/js/telegram-web-app.js"
					strategy="beforeInteractive"
				/>
			</head>
			<body className={inter.className}>
				<LangProvider>
					<TonProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							enableSystem
							disableTransitionOnChange
						>
							<TmaProvider>
								<UserProvider>
									<ModalProvider>
										{/* <Loader /> */}
										<NextTopLoader
											color="var(--pink)"
											height={2}
											showSpinner={false}
											zIndex={999999}
										/>
										<main className={styles.layout}>
											<div className={styles.main} data-ref="main">
												{children}
												<Navigation />
											</div>
										</main>
										<Toaster />
										<div id="modal-root" />
										{/* <NoMobile /> */}
									</ModalProvider>
								</UserProvider>
							</TmaProvider>
						</ThemeProvider>
					</TonProvider>
				</LangProvider>
				{/* <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} /> */}
			</body>
		</html>
	);
}
