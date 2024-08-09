'use client';

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
import Button from '@/components/ui2/Button';

export default function Drawers() {
	const t = useTranslations('subscribe_channels_card');

	return (
		<Drawer>
			<DrawerTrigger>
			Наши соцсети
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle> {t('title')} </DrawerTitle>
					<DrawerDescription> {t('description')} </DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button> {t('completed')} </Button>
					<DrawerClose>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
