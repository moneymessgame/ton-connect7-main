'use client';

import { useInitData } from '@telegram-apps/sdk-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Timer, Coins, UserPlus, PanelBottomOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';

import styles from './Menu.module.scss';
import { Params } from '@/components/blocks/Params';

export default function Menu() {
    const initData = useInitData();

	const pathname = usePathname();

	
	const navItems = [
		{ href: '/', icon: Home, label: 'Home' },
		{ href: '/tracker', icon: Timer, label: 'Tracker' },
		{ href: '/seed', icon: Timer, label: 'test' },
		{ href: '/referrals', icon: UserPlus, label: 'Referrals' },
		{ href: '/socials', icon: PanelBottomOpen, label: 'Socials' },
		{ href: '/ton', icon: Coins, label: 'TON' },

	];

    return (
        <header className={cn('h-18 bg-background/40 backdrop-blur-[4px] shadow-2xl', styles.menu)}>
            <User />
            <div className={styles.right}>
                {/* <Exchange />*/}
                <Params />
            </div>
        </header>
    );

}

// 	return (
// 		<nav
// 			className={cn(
// 				'fixed bottom-0 w-full transform z-40 flex items-center justify-around  bg-gradient-to-r from-[rgba(58,49,79, 0.8)] to-[rgba(46,38,69, 0.8)] rounded-xl h-18 bg-background/40 backdrop-blur-[4px]',
// 				styles.nav
// 			)}
// 		>
// 			{navItems.map((item) => {
// 				const Icon = item.icon;
// 				const isActive = pathname === item.href;

// 				return (
// 					<Link
// 						key={item.href}
// 						href={item.href}
						
// 						className={`relative flex flex-col items-center justify-center gap-1 transition-colors font-light ${
// 							isActive ? 'text-[#abdbff]' : 'text-[#fff]'
// 						}`}
// 						prefetch={false}
// 					>
// 						{isActive && (
// 							<div
// 								className="absolute inset-0 rounded-full -z-10"
// 								style={{
// 									background:
// 										'radial-gradient(circle, rgba(5, 150, 243, 0.3), transparent 40%)',
// 									filter: 'blur(10px)',
// 								}}
// 							/>
// 						)}
// 						<div className="relative flex items-center justify-center h-12 w-12  transition-all">
// 							<Icon
// 								className={`h-10 w-10 pt-4 stroke-1 ${
// 									isActive ? 'text-[#abdbff]' : 'text-[#fff]'
// 								}`}
// 							/>
// 						</div>
// 						<span className="text-xs pb-4">{item.label}</span>
// 					</Link>
// 				);
// 			})}
// 		</nav>
// 	);
// }




