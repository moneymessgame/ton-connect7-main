'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Timer, Coins, UserPlus, PanelBottomOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

import styles from './Navigation.module.scss';

export default function Navigation() {
	const pathname = usePathname();

	const navItems = [
		{ href: '/', icon: Home, label: 'Home' },
		{ href: '/tracker', icon: Timer, label: 'Tracker' },
		{ href: '/seed', icon: Timer, label: 'Seed' },
		{ href: '/characters', icon: Timer, label: 'Characters' },
		{ href: '/referrals', icon: UserPlus, label: 'Referrals' },
		{ href: '/socials', icon: PanelBottomOpen, label: 'Socials' },
		{ href: '/ton', icon: Coins, label: 'TON' },
	];

	return (
		<nav
			className={cn(
				'fixed bottom-0 w-full transform z-[51] flex items-center justify-around  bg-gradient-to-r from-[rgba(58,49,79, 0.8)] to-[rgba(46,38,69, 0.8)] rounded-xl h-18 bg-background/40 backdrop-blur-[4px]',
				styles.nav
			)}
		>
			{navItems.map((item) => {
				const Icon = item.icon;
				const isActive = pathname === item.href;

				return (
					<Link
						key={item.href}
						href={item.href}
						
						className={`relative flex flex-col items-center justify-center gap-1 transition-colors font-light mb-1 ${
							isActive ? 'text-active_color' : 'text-[#fff]'
						}`}
						prefetch={false}
					>
						{isActive && (
							<div
								className="absolute inset-0 rounded-full -z-10"
								style={{
									background:
										'radial-gradient(circle, rgba(5, 150, 243, 0.3), transparent 40%)',
									filter: 'blur(10px)',
								}}
							/>
						)}
						<div className="relative flex items-center justify-center h-12 w-12  transition-all">
							<Icon
								className={`h-10 w-10 pt-4 stroke-1 ${
									isActive ? 'text-active_color' : 'text-[#fff]'
								}`}
							/>
						</div>
						<span className="text-xs pb-5">{item.label}</span>
					</Link>
				);
			})}
		</nav>
	);
}
