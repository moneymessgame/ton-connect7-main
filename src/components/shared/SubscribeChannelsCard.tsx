import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { useUser } from '@/contexts/UserContext';
import { ChallengeWithStatus } from '@/utils/challenges';
import { X } from 'lucide-react';
import CardWithMenu from '../ui2/CardWithMenu';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import ChallengeModal from './ChallengeModal';

const SubscribeChannelsCard: React.FC = () => {
	const { user } = useUser();
	const [challenges, setChallenges] = useState<ChallengeWithStatus[]>([]);
	const [selectedChallenge, setSelectedChallenge] =
		useState<ChallengeWithStatus | null>(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const t = useTranslations();

	useEffect(() => {
		const fetchChallenges = async () => {
			try {
				const response = await fetch(`/api/challenges/${user!.id}`);
				const data = await response.json();
				if (data.challenges) {
					setChallenges(data.challenges);
				} else {
					console.error(data.message);
				}
			} catch (error) {
				console.error('Error fetching challenges:', error);
			}
		};

		if (user) {
			fetchChallenges();
		}
	}, [user]);

	const updateChallengeStatus = (challengeId: string) => {
		setChallenges((prevChallenges) =>
			prevChallenges.map((challenge) =>
				challenge.id === challengeId
					? { ...challenge, isCompleted: true }
					: challenge
			)
		);
	};

	const handleDrawerOpen = (challenge: ChallengeWithStatus) => {
		setSelectedChallenge(challenge);
		setIsDrawerOpen(true);
	};

	const menuItems = challenges.map((challenge) => ({
		image: challenge.image,
		title: t(challenge.description),
		reward: challenge.isCompleted
			? t('subscribe_channels_card.completed')
			: `+${challenge.reward}`,
		onClick: () => handleDrawerOpen(challenge),
	}));

	const renderContent = () => (
		<div className="text-center mb-5">
			<p className="text-2xl font-bold mb-">
				{t('subscribe_channels_card.title')}
			</p>
			<p className="px-2 text-sm">{t('subscribe_channels_card.description')}</p>
		</div>
	);

	return (
		<>
			<CardWithMenu
				gradient="green"
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
							onSuccess={() => updateChallengeStatus(selectedChallenge.id)}
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
