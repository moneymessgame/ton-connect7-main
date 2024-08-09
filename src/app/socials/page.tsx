'use client';

import { useTranslations } from 'next-intl';

import Button from '@/components/ui2/Button';
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
import MItem from '@/components/ui2/MItem';
import SubCC from '@/components/SubCC';

export default function Drawers() {
	const t = useTranslations();

	return (
		<>
			<Drawer >
				<Button type="ghost">
					<DrawerTrigger>
						{t('subscribe_channels_card.main_title')}
					</DrawerTrigger>
				</Button>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle> {t('subscribe_channels_card.title')} </DrawerTitle>
						<DrawerDescription>
							{t('subscribe_channels_card.description')}{' '}
						</DrawerDescription>
						<SubCC />
					</DrawerHeader>
					<DrawerFooter>
						{/* <Button type="ghost"> {t('subscribe_channels_card.completed')} </Button> */}
						<DrawerClose>
							{/* <Button type="ghost"> {t('calendar.cancel')} </Button> */}
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
