import { Viewport } from 'next';
import type { Metadata } from 'next';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { Montserrat } from 'next/font/google';
// import { GoogleAnalytics } from '@next/third-parties/google';

import { ModalProvider } from '@/contexts/ModalContext';
import { UserProvider } from '@/contexts/UserContext';
import LangProvider from '@/components/providers/lang-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import TmaProvider from '@/components/providers/tma-provider';
import TonProvider from '@/components/providers/ton-provider';
import Loader from '@/components/shared/common/Loader';
import Menu from '@/components/blocks/Menu';
import Navigation from '@/components/blocks/Navigation';
import { NoMobile } from '@/components/blocks/NoMobile';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import styles from './layout.module.scss';
import '@/styles/globals.scss';

const font = Montserrat({ subsets: ['cyrillic-ext'] });

export const viewport: Viewport = {
	themeColor: 'rgb(5, 8, 17)',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: 'MoneyMess Game',
	description: 'Telegram mini app',
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
			<body className={cn('', font.className)}>
				<LangProvider>
					<TonProvider>
						<ThemeProvider
							attribute="class"
							enableSystem
							disableTransitionOnChange
						>
							<TmaProvider>
								<UserProvider>
									<ModalProvider>
										{/* <Loader /> */}
										<NextTopLoader
											color="var(--blue)"
											height={1}
											showSpinner={false}
											zIndex={999999}
										/>
										<div className={styles.layout}>
											<Menu />
											<main className={styles.main} data-ref="main">
												{children}
											</main>
											<Navigation />
										</div>
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
