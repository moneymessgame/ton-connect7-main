import React from 'react';

import ActionCard from '@/components/shared/common/ActionCard';
import BalanceSection from '@/components/shared/common/BalanceSection';
import Farming from '@/components/shared/common/Farming';
import HeaderTracker from '@/components/shared/common/HeaderTracker';
import InviteUserCard from './InviteUserCard';
import SubscribeChannelsCard from './SubscribeChannelsCard';
import TellAboutYourselfCard from './TellAboutYourselfCard';
import Card from '@/components/ui2/Card';

import { useTonConnect } from '@/hooks/useTonConnect';

type PeriodTrackingProps = {
	lastMenstruationDate?: Date;
	tokenBalance: number;
	onPeriodDateChange: () => void;
	onStartFarming: () => void;
	onViewInfo: () => void;
	onShareData: () => void;
	onInviteUser: () => void;
	onSubscribeChannels: () => void;
};

const PeriodTracking: React.FC<PeriodTrackingProps> = ({
	lastMenstruationDate,
	tokenBalance,
	onPeriodDateChange,
	onStartFarming,
	onViewInfo,
	onShareData,
	onInviteUser,
	onSubscribeChannels,
}) => {
	const { network, wallet, address } = useTonConnect();

	return (
		<div className="flex min-h-screen flex-col items-center">
			<header className="w-full">
				<HeaderTracker
					lastMenstruationDate={lastMenstruationDate}
					onPeriodDateChange={onPeriodDateChange}
				/>
			</header>
			<main className="flex w-full flex-1 flex-col items-center px-4 py-8">
				<Farming />
				<div className="mb-20 mt-6 w-full max-w-md space-y-4">
					{/* <SubscribeChannelsCard /> */}
					{/* <InviteUserCard /> */}
					{/* <TellAboutYourselfCard /> */}
				</div>
			</main>
		</div>
	);
};

export default PeriodTracking;