'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Timer, Coins, UserPlus, PanelBottomOpen } from 'lucide-react';

export default function Navigation() {
	const pathname = usePathname();

	// Массив для навигации с маршрутом, компонентом иконки и названием
	const navItems = [
		{ href: '/', icon: Home, label: 'Home' },
		{ href: '/tracker', icon: Timer, label: 'Tracker' },
		{ href: '/referrals', icon: UserPlus, label: 'Referrals' },
		{ href: '/socials', icon: PanelBottomOpen, label: 'Socials' },
		{ href: '/ton', icon: Coins, label: 'TON' },
	];

	return (
		<nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex items-center justify-around  bg-gradient-to-r from-[#3a314f] to-[#2e2645]  rounded-2xl h-16 w-[90%] max-w-xl shadow-md border">
			{navItems.map((item) => {
				const Icon = item.icon;
				const isActive = pathname === item.href;

				return (
					<Link
						key={item.href}
						href={item.href}
						className="relative flex flex-col items-center justify-center gap-1 transition-colors text-[#b9a1e2]"
						prefetch={false}
					>
						{isActive && (
							<div
								className="absolute inset-0 rounded-full -z-10"
								style={{
									background: 'radial-gradient(circle, rgba(255, 230, 0, 0.3), transparent 90%)',
									filter: 'blur(10px)',
								}}
							/>
						)}
						<div className="relative flex items-center justify-center h-12 w-12  transition-all">
							<Icon className={`h-10 w-10 pt-4 ${isActive ? 'text-white' : 'text-[#b9a1e2]'}`} />
						</div>
						<span className="text-xs pb-4">{item.label}</span>
					</Link>
				);
			})}
		</nav>
	);
}
