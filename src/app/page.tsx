'use client';

import { useEffect } from 'react';
import { useInitData, postEvent } from '@telegram-apps/sdk-react';
import Image from 'next/image';

import Menu from '@/components/blocks/Menu';
import CardSpread from '@/components/shared/animata/Card/card-spread';
import FirstPack from '@/components/test/card-pack-open';
import SecondPack from '@/components/test/card-pack-opener';
import ThirdPack from '@/components/test/card-pack-opening';

export default function Home() {
	const initData = useInitData();

	useEffect(() => {
		postEvent('web_app_set_background_color', { color: '#03070f' });
		postEvent('web_app_set_header_color', { color: '#03070f' });
		postEvent('web_app_setup_main_button', { is_visible: true });
	}, []);

	return (
		<main className="">
			<div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
				<Menu />
				{/* <FirstPack /> */}
				{/* <SecondPack /> */}
				{/* <ThirdPack /> */}
			</div>
		</main>
	);
}
