'use client';

import Loader from '@/components/shared/Loader';
import { useUser } from '@/contexts/UserContext';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import PeriodTracking from '@/components/shared/PeriodTracking';

export default function Tracker() {
	const { user, loading, refetchUser, lastPeriodDate } = useUser();
	const router = useRouter();

	const handlePeriodDateChange = () => {
		console.log('Period date change clicked');
		router.push('/calendar');
	};

	const handleStartFarming = () => {
		console.log('Start farming clicked');
		// Implement the start farming logic here
	};

	const handleViewInfo = () => {
		console.log('View info clicked');
		// Implement the view info logic here
	};

	const handleShareData = () => {
		console.log('Share data clicked');
		// Implement the share data logic here
	};

	const handleInviteUser = () => {
		console.log('Invite user clicked');
		// Implement the invite user logic here
	};

	const handleSubscribeChannels = () => {
		console.log('Subscribe to channels clicked');
		// Implement the subscribe channels logic here
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (loading) {
				refetchUser();
			}
		}, 2000);

		return () => clearTimeout(timer);
	}, [loading, refetchUser]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center text-center">
			{/*todo: add popup for first session if no lastPeriodDate*/}
			{user && (
				<PeriodTracking
					lastMenstruationDate={
						lastPeriodDate ? new Date(lastPeriodDate) : undefined
					}
					tokenBalance={user.tokenBalance}
					onPeriodDateChange={handlePeriodDateChange}
					onStartFarming={handleStartFarming}
					onViewInfo={handleViewInfo}
					onShareData={handleShareData}
					onInviteUser={handleInviteUser}
					onSubscribeChannels={handleSubscribeChannels}
				/>
			)}
		</div>
	);
}
