'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

import { useUser } from '@/contexts/UserContext';
import { useSocialsStore } from '@/stores/socials'; 
import Loader from '@/components/shared/common/Loader';
import CardWithMenu from '@/components/ui2/CardWithMenu';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { ChallengeWithStatus } from '@/utils/challenges';
import ChallengeModal from './ChallengeModal';

const SubscribeChannelsCard: React.FC = () => {
	const { user } = useUser();
	const { challenges, loading, fetchChallenges, updateChallengeStatus } = useSocialsStore();
	const [selectedChallenge, setSelectedChallenge] = useState<ChallengeWithStatus | null>(null); 
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const t = useTranslations();

	// Загружаем задачи только если они еще не загружены
	useEffect(() => {
		if (user && !challenges) {
			fetchChallenges(user!.id);
		}
	}, [user, challenges, fetchChallenges]);

	// Обновление статуса задачи
	const handleChallengeCompletion = (challengeId: string) => {
		updateChallengeStatus(challengeId);
	};

	// Открытие модального окна
	const handleDrawerOpen = (challenge: ChallengeWithStatus) => {
		setSelectedChallenge(challenge);
		setIsDrawerOpen(true);
	};

	if (loading) {
		return <Loader />;
	}

	const menuItems = challenges?.map((challenge) => ({
		image: challenge.image,
		title: t(challenge.description),
		reward: challenge.isCompleted
			? t('subscribe_channels_card.completed')
			: `+${challenge.reward}`,
		onClick: () => handleDrawerOpen(challenge),
	})) || [];

	// Рендеринг заголовка и подзаголовка
	const renderContent = () => (
		<div className="text-center mb-5">
			<p className="text-2xl font-black mb-1">
				{t('subscribe_channels_card.title')}
			</p>
			<p className="text-sm text-grey font-normal">{t('subscribe_channels_card.description')}</p>
		</div>
	);

	return (
		<>
			<CardWithMenu
				renderContent={renderContent}
				menuItems={menuItems}
			/>

			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerContent className="shadow-glow animate-glow">
					<DrawerHeader>
						<DrawerClose onClick={() => setIsDrawerOpen(false)}>
							<X className="h-7 w-7 ml-auto" />
						</DrawerClose>
						<DrawerTitle className="text-xl"></DrawerTitle>
					</DrawerHeader>
					{selectedChallenge && (
						<ChallengeModal
							key={selectedChallenge.id}
							title={t(selectedChallenge.name)}
							description={t(selectedChallenge.description)}
							reward={selectedChallenge.reward}
							refLink={selectedChallenge.refLink}
							userId={user!.id}
							challengeId={selectedChallenge.id} 
							telegramId={user!.telegramId.toString()}
							onSuccess={() => handleChallengeCompletion(selectedChallenge.id)}
							isCompleted={selectedChallenge.isCompleted}
						/>
					)}
					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default SubscribeChannelsCard;
