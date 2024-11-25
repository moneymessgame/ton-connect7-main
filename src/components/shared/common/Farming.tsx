import { MessageSquareHeart, Rss, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import FarmingTracker from '@/components/ui2/FarmingTracker';
import { useUser } from '@/contexts/UserContext';

const cardClassName =
	'flex flex-col justify-between items-center p-3 gap-2 bg-[var(--font-dark-secondary)] rounded-[4px] flex-1';

const SubscribeCard: React.FC = () => {
	const t = useTranslations('farming.subscribe_card');
	return (
		<div className={`${cardClassName} rounded-[4px_4px_4px_20px] `}>
			<Rss className="size-5 text-[var(--font-pink-primary)]" />
			<div className="flex grow flex-col items-center text-center">
				<h4 className="text-base font-extrabold text-[var(--font-dark-primary)] sm:text-sm">
					{t('reward')}
				</h4>
				<p className="text-sm font-medium text-[var(--font-dark-primary)]">
					{t('description')}
				</p>
			</div>
		</div>
	);
};

const ShareCard: React.FC = () => {
	const t = useTranslations('farming.share_card');
	return (
		<div className={`${cardClassName} rounded-[4px_4px_4px_4px] `}>
			<MessageSquareHeart className="size-5 text-[var(--font-blue-primary)]" />
			<div className="flex grow flex-col items-center text-center">
				<h4 className="text-base font-extrabold text-[var(--font-dark-primary)] sm:text-sm">
					{t('reward')}
				</h4>
				<p className="text-sm font-medium text-[var(--font-dark-primary)]">
					{t('description')}
				</p>
			</div>
		</div>
	);
};

const InviteCard: React.FC = () => {
	const t = useTranslations('farming.invite_card');
	return (
		<div className={`${cardClassName} rounded-[4px_4px_20px_4px] `}>
			<UserPlus className="size-5 text-[var(--font-orange-primary)]" />
			<div className="flex grow flex-col items-center text-center">
				<h4 className="text-base font-extrabold text-[var(--font-dark-primary)] sm:text-sm">
					{t('reward')}
				</h4>
				<p className="text-sm font-medium text-[var(--font-dark-primary)]">
					{t('description')}
				</p>
			</div>
		</div>
	);
};

const Farming: React.FC<object> = () => {
	const {
		user,
		refetchUser,
		farmingSession,
		farmingSessionLoading,
		refetchFarmingSession,
	} = useUser();
	const [isFarming, setIsFarming] = useState(false);
	const [timeStart, setTimeStart] = useState<Date | null>(null);
	const [timeFinish, setTimeFinish] = useState<Date | null>(null);

	useEffect(() => {
		if (farmingSession) {
			const now = new Date().getTime();
			const finishTime = new Date(farmingSession.timeFinish).getTime();
			const startTime = finishTime - 1 * 60 * 60 * 1000; // 8 hours before finish
			if (now < finishTime) {
				setIsFarming(true);
				setTimeStart(new Date(startTime));
				setTimeFinish(new Date(finishTime));
			}
		} else {
			setIsFarming(false);
		}
	}, [farmingSession]);

	const handleFarmingStart = async () => {
		if (!user) return;

		const start = 'start';

		try {
			const response = await fetch('/api/farming/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status: start, userId: user.id }),
			});
			if (response.ok) {
				refetchFarmingSession(true); // Refresh session data
			} else {
				console.error('Failed to start farming session');
			}
		} catch (error) {
			console.error('Error starting farming session:', error);
		}
	};

	const handleViewInfo = (type: 'details' | 'history') => {
		// Handle view info logic
	};

	const handleFarmingFinish = async () => {
		setIsFarming(false);
		refetchFarmingSession(false); // Refetch the latest farming session
		refetchUser();
	};

	return (
		<div className="relative mx-auto flex w-full flex-col gap-2">
			<FarmingTracker
				tokenBalance={user?.tokenBalance ?? 0}
				isFarming={isFarming}
				timeStart={timeStart}
				timeFinish={timeFinish}
				onStartFarming={handleFarmingStart}
				onViewInfo={handleViewInfo}
				setIsFarming={setIsFarming}
				onFinishFarming={handleFarmingFinish} // Forward the finish handler
			/>
			<div className="flex size-full flex-row items-stretch container-style gap-3">
				<SubscribeCard />
				<ShareCard />
				<InviteCard />
			</div>
		</div>
	);
};

export default Farming;
