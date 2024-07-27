'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Home, Search, Settings, User } from 'lucide-react';

export default function Navigation() {
	const searchParams = useSearchParams();
	const telegramId = searchParams.get('telegramId');

	console.log('searchParams:', searchParams); // добавьте этот лог для отладки
	console.log('telegramId:', telegramId); // добавьте этот лог для отладки

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-around bg-background border-t border-border shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
			<Link
				href="/"
				className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus:text-foreground"
				prefetch={false}
			>
				<Home className="h-6 w-6" />
				<span className="text-xs">Home</span>
			</Link>
			<Link
				href="/tracker"
				className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus:text-foreground"
				prefetch={false}
			>
				<Search className="h-6 w-6" />
				<span className="text-xs">Tracker</span>
			</Link>
			<Link
				href="/referrals"
				className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus:text-foreground"
				prefetch={false}
			>
				<User className="h-6 w-6" />
				<span className="text-xs">Referrals</span>
			</Link>
			<Link
				href="/settings"
				className="flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground focus:text-foreground"
				prefetch={false}
			>
				<Settings className="h-6 w-6" />
				<span className="text-xs">Settings</span>
			</Link>
		</nav>
	);
}
