'use client';

import { useTranslations } from 'next-intl';

import Channels from '@/components/blocks/Channels';
import SubscribeChannelsCard from '@/components/shared/SubscribeChannelsCard';

export default function Drawers() {
	const t = useTranslations();

	return (
		<>
			<SubscribeChannelsCard />
		</>
	);
}
