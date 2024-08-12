import { useTranslations } from 'next-intl';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

import React from 'react';
import MItem from './MItem';

const DrawerModal = async () => {
	const t = useTranslations();

	return (
		<Drawer>
			<Button>
				<DrawerTrigger>Open</DrawerTrigger>
			</Button>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle> {t('subscribe_channels_card.title')} </DrawerTitle>
					<DrawerDescription>
						{t('subscribe_channels_card.description')}{' '}
					</DrawerDescription>
					<MItem image="/images/coin.png" reward="F" title="Subscribe" />
				</DrawerHeader>
				<DrawerFooter>
					<Button> {t('subscribe_channels_card.completed')} </Button>
					<DrawerClose>
						<Button> {t('calendar.cancel')} </Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerModal;
