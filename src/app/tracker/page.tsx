'use client';

import Loader from '@/components/shared/common/Loader';
import { useUser } from '@/contexts/UserContext';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Ленивый импорт для PeriodTracking
const PeriodTracking = dynamic(
	() => import('@/components/shared/common/PeriodTracking'),
	{
		ssr: false, // Отключаем серверный рендеринг для этого компонента
		loading: () => <Loader />, // Показываем загрузчик, пока компонент не загружен
	}
);

export default function Tracker() {
	const { user, loading, refetchUser, lastPeriodDate } = useUser();
	const router = useRouter();

	// Обработчики, мемоизированные через useCallback
	const handlePeriodDateChange = useCallback(() => {
		console.log('Period date change clicked');
		router.push('/calendar');
	}, [router]);

	const handleStartFarming = useCallback(() => {
		console.log('Start farming clicked');
		// Реализуйте логику старта фермерства
	}, []);

	const handleViewInfo = useCallback(() => {
		console.log('View info clicked');
		// Реализуйте логику отображения информации
	}, []);

	const handleShareData = useCallback(() => {
		console.log('Share data clicked');
		// Реализуйте логику обмена данными
	}, []);

	const handleInviteUser = useCallback(() => {
		console.log('Invite user clicked');
		// Реализуйте логику приглашения пользователя
	}, []);

	const handleSubscribeChannels = useCallback(() => {
		console.log('Subscribe to channels clicked');
		// Реализуйте логику подписки на каналы
	}, []);

	// Убираем лишнюю задержку в refetchUser
	useEffect(() => {
		if (loading) {
			refetchUser();
		}
	}, [loading, refetchUser]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="flex flex-col items-center justify-center text-center">
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
