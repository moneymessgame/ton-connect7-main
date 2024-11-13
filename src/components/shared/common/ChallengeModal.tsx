import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import Button from '@/components/ui2/Button';
import Coin from '@/components/ui2/Coin';
import { Separator } from '@/components/ui/separator';

interface ChallengeModalProps {
	title: string;
	description: string;
	reward: number;
	refLink: string;
	userId: string;
	challengeId: string;
	telegramId: string;
	onSuccess: () => void;
	isCompleted?: boolean;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({
	title,
	description,
	reward,
	refLink,
	userId,
	challengeId,
	telegramId,
	onSuccess,
	isCompleted,
}) => {
	const [rewardChecked, setRewardChecked] = useState(isCompleted);
	const [rewardStatus, setRewardStatus] = useState(
		isCompleted ? 'success' : ''
	);
	const t = useTranslations('challenge_modal');

	const handleCheckReward = async () => {
		if (rewardStatus === 'success') {
			return;
		}

		try {
			const response = await fetch('/api/challenges', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId, challengeId, telegramId }),
			});

			if (response.ok) {
				setRewardChecked(true);
				setRewardStatus('success');
				onSuccess();
			} else {
				setRewardStatus('failed');
			}
		} catch (error) {
			setRewardStatus('failed');
		}
	};

	return (
		<div>
			<h2 className="mb-7 px-2 text-center text-2xl font-semibold text-white">
				{title}
			</h2>
			<h3 className="mb-7 text-center text-sm font-medium text-[var(--font-blue-secondary)]">
				{description}
			</h3>
			<div className="mb-4 flex items-center justify-center text-lg font-bold">
				<div className="flex items-center">
					<span className="pr-1 text-xl font-bold text-white md:text-2xl">
						+{reward}
					</span>
					<Coin className="size-5 md:size-10" type="white" />
				</div>
			</div>
			<Separator className="mt-7 mb-7 w-2/3 mx-auto bg-white h-px shadow-glow animate-glow" />
			<div className="flex flex-row items-center justify-center space-x-2">
				{!rewardChecked ? (
					<>
						<Button type="blue" subtype="secondary" onClick={handleCheckReward}>
							{t('check_reward')}
						</Button>
						<Button
							type="blue"
							subtype="primary"
							onClick={() => window.open(refLink, '_blank')}
						>
							{t('subscribe')}
						</Button>
					</>
				) : rewardStatus === 'success' ? (
					<>
						<Button>{t('reward_received')}</Button>
						<Button onClick={() => window.open(refLink, '_blank')}>
							{t('go_to_channel')}
						</Button>
					</>
				) : (
					<div className="text-2xl text-red-500">{t('reward_failed')}</div>
				)}
			</div>
		</div>
	);
};

export default ChallengeModal;
