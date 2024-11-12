// 'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, PanelBottomOpen } from 'lucide-react';
import SubscribeChannelsCard from '../shared/SubscribeChannelsCard';

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

const Channels = () => {
	const t = useTranslations();

	return (
		<Drawer>
			<DrawerTrigger>
				<SubscribeChannelsCard />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerClose>
						<X className="h-7 w-7 ml-auto" />
					</DrawerClose>
					<DrawerTitle className="text-xl">title</DrawerTitle>
					<DrawerDescription>description</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter></DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default Channels;
