import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Coin from './ui2/Coin';


function ChalModal() {
	const t = useTranslations();

	return (
		<div className="border-2 border-white rounded-lg p-2 flex items-center gap-2 space-x-5">
			<Coin className="ml-4" />
			<div className="flex flex-col">
				<div> {t('challenges.challenge1.description')} </div>
				<div className="text-left font-extrabold">
					{t('subscribe_channels_card.completed')}
				</div>
			</div>
			<ChevronRightIcon className="size-5 shrink-0 text-white opacity-90 md:size-6 mr-1" />
		</div>
	);
}

export default ChalModal;
